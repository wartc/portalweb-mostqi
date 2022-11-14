using PortalWeb.Contracts.Auth;
using PortalWeb.Repositories;
using PortalWeb.Utils;

namespace PortalWeb.Services;

public class AuthService
{
    private readonly UserRepository _userRepository;

    public AuthService(UserRepository userRepository) => _userRepository = userRepository;

    public async Task<ServiceResponse<LoginResponse>> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.FindByEmailAsync(request.Email);

        if (user == null || Hasher.Verify(request.Password, user.Password) == false)
            return new ServiceResponse<LoginResponse>(false, 401, "Email ou senha incorretos");

        var token = "TODO: Generate token";

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