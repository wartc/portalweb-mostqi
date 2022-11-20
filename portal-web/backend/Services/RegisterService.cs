using PortalWeb.Utils;
using PortalWeb.Contracts.Register;
using PortalWeb.Repositories;
using PortalWeb.Models;

namespace PortalWeb.Services;

public class RegisterService
{
    private readonly UserRepository _userRepository;
    private readonly EmailService _emailService;

    public RegisterService(UserRepository userRepository, EmailService emailService)
    {
        _userRepository = userRepository;
        _emailService = emailService;
    }

    public async Task<ServiceResponse<RegisterResponse>> RegisterAsync(RegisterRequest request)
    {
        var generatedPassword = new Guid().ToString().Substring(0, 10);

        var hashedPassword = Hasher.Hash(generatedPassword);

        var newUser = new User
        {
            Name = request.Name,
            Email = request.Email,
            Password = hashedPassword,
            Type = UserType.CONTRIBUTOR,
            ClientDetails = null,
            CreatedBy = null,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _userRepository.CreateAsync(newUser);

        var emailResponse = _emailService.SendEmail(request.Email,
            "Cadastro no PortalWeb",
            @$"<h2>Seu cadastro foi realizado com sucesso!</h2>
            <p>Sua senha é: {generatedPassword}</p>
            <p>Por favor, altere sua senha pelo sistema assim que possível.</p>"
        );

        if (!emailResponse.Success)
        {
            return new ServiceResponse<RegisterResponse>(false, emailResponse.StatusCode, emailResponse.Message);
        }

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