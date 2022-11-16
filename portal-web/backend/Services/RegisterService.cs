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

    private static string GenerateRandomPassword()
    {
        Random random = new();
        const string charset = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?";
        return new string(Enumerable.Repeat(charset, 12)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }

    public async Task<ServiceResponse<RegisterResponse>> RegisterAsync(RegisterRequest request)
    {
        var generatedPassword = GenerateRandomPassword();

        var hashedPassword = Hasher.Hash(generatedPassword);

        var newUser = new User
        {
            Name = request.Name,
            Email = request.Email,
            Password = hashedPassword,
            Type = UserType.CONTRIBUTOR,
            ClientDetails = null
        };

        await _userRepository.CreateAsync(newUser);

        var emailReponse = _emailService.SendEmail(request.Email,
            "Cadastro no PortalWeb",
            @$"<h2>Seu cadastro foi realizado com sucesso!</h2>
            <p>Sua senha é: {generatedPassword}</p>
            <p>Por favor, altere sua senha pelo sistema assim que possível.</p>"
        );

        if (!emailReponse.Success)
        {
            return new ServiceResponse<RegisterResponse>(false, emailReponse.StatusCode, emailReponse.Message);
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