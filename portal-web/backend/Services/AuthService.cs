using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Net.Http.Headers;
using System.Security.Claims;
using System.Text;

using PortalWeb.Contracts.Auth;
using PortalWeb.Repositories;
using PortalWeb.Models;
using PortalWeb.Utils;

namespace PortalWeb.Services;

public class AuthService
{
    private const int REFRESH_TOKEN_EXPIRATION_TIME_HOURS = 48;
    private const int ACCESS_TOKEN_EXPIRATION_TIME_MINUTES = 30;
    private readonly UserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IConfiguration configuration, UserRepository userRepository)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public void SetRefreshTokenCookie(HttpResponse response, string userId)
    {
        response.Cookies.Append("refreshToken", GenerateRefreshToken(userId), new CookieOptions
        {
            Expires = DateTime.UtcNow.AddHours(REFRESH_TOKEN_EXPIRATION_TIME_HOURS),
            HttpOnly = true,
            Secure = true,
            Path = "/",
        });

    }

    private string GenerateJWT(Claim[] claims, int expirationInMinutes)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(expirationInMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string GenerateAccessToken(User user)
    {
        var claims = new[]
        {
            new Claim("id", user.Id!.ToString()),
            new Claim("name", user.Name),
            new Claim("email", user.Email),
            new Claim("type", user.Type.ToString()),
            new Claim(ClaimTypes.Role, user.Type.ToString())
        };

        return GenerateJWT(claims, ACCESS_TOKEN_EXPIRATION_TIME_MINUTES);
    }

    private string GenerateRefreshToken(string userId)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(JwtRegisteredClaimNames.Exp, DateTimeOffset.UtcNow.AddDays(REFRESH_TOKEN_EXPIRATION_TIME_HOURS).ToUnixTimeSeconds().ToString()),
            new Claim("SigningKey", Hasher.Hash(_configuration["Jwt:RefreshKey"]!))
        };

        return GenerateJWT(claims, REFRESH_TOKEN_EXPIRATION_TIME_HOURS * 60);
    }

    private bool ValidateRefreshToken(User user, string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwtSecurityToken = handler.ReadJwtToken(token);

        var userId = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
        var signingKey = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == "SigningKey")?.Value;

        // token expirado
        if (jwtSecurityToken.ValidTo < DateTime.UtcNow) return false;

        // token inválido
        if (signingKey == null || !Hasher.Verify(_configuration["Jwt:RefreshKey"]!, signingKey) || userId != user.Id) return false;

        return true;
    }

    public async Task<ServiceResponse<LoginResponse>> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.FindByEmailAsync(request.Email);

        if (user == null || Hasher.Verify(request.Password, user.Password) == false)
            return new ServiceResponse<LoginResponse>(false, 401, "Email ou senha incorretos");

        var token = GenerateAccessToken(user);

        var response = Mapper.MapLoginResponse(user, token);

        return new ServiceResponse<LoginResponse>(true, response);
    }

    public async Task<ServiceResponse<RefreshResponse>> RefreshAsync(string refreshToken, ClaimsPrincipal requestingUser)
    {
        var user = await new AuthorizationUtils(_userRepository).GetRequestingUser(requestingUser);

        if (user == null)
            return new ServiceResponse<RefreshResponse>(false, 401, "Usuário não encontrado");

        if (!ValidateRefreshToken(user, refreshToken))
            return new ServiceResponse<RefreshResponse>(false, 401, "Token inválido ou expirado");

        var token = GenerateAccessToken(user);

        var response = Mapper.MapRefreshResponse(token);

        return new ServiceResponse<RefreshResponse>(true, response);
    }
}