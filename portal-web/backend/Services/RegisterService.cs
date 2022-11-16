using PortalWeb.Utils;
using PortalWeb.Contracts.Register;
using PortalWeb.Repositories;
using PortalWeb.Models;

namespace PortalWeb.Services;

public class RegisterService
{
    private readonly UserRepository _userRepository;

    public RegisterService(UserRepository userRepository) => _userRepository = userRepository;

    public async Task<ServiceResponse<RegisterResponse>> RegisterAsync(RegisterRequest request)
    {
        var hashedPassword = Hasher.Hash(request.Password);

        var newUser = new User
        {
            Name = request.Name,
            Email = request.Email,
            Password = hashedPassword,
            Type = UserType.CONTRIBUTOR,
            ClientDetails = null
        };

        await _userRepository.CreateAsync(newUser);

        var response = new RegisterResponse
        {
            Id = newUser.Id!,
            Name = newUser.Name,
            Email = newUser.Email,
            Type = newUser.Type
        };

        return new ServiceResponse<RegisterResponse>(true, response);
    }
}