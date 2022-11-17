using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using PortalWeb.Contracts.Auth;
using PortalWeb.Repositories;
using PortalWeb.Models;
using PortalWeb.Utils;

namespace PortalWeb.Services;

public class AuthService
{
    private readonly UserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IConfiguration configuration, UserRepository userRepository)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    private string GenerateJWT(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim("id", user.Id!.ToString()),
            new Claim("name", user.Name),
            new Claim("email", user.Email),
            new Claim("type", user.Type.ToString()),
            new Claim(ClaimTypes.Role, user.Type.ToString())
        };

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<ServiceResponse<LoginResponse>> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.FindByEmailAsync(request.Email);

        if (user == null || Hasher.Verify(request.Password, user.Password) == false)
            return new ServiceResponse<LoginResponse>(false, 401, "Email ou senha incorretos");

        var token = GenerateJWT(user);

        var response = new LoginResponse
        {
            Id = user.Id!,
            Name = user.Name,
            Email = user.Email,
            Type = user.Type,
            Token = token
        };

        return new ServiceResponse<LoginResponse>(true, response);
    }
}