using System.Security.Claims;
using System.Net;
using PortalWeb.Contracts.User;
using PortalWeb.Models;
using PortalWeb.Repositories;
using PortalWeb.Utils;

namespace PortalWeb.Services;

public class UserService
{
    private readonly UserRepository _userRepository;
    private readonly EmailService _emailService;

    public UserService(UserRepository userRepository, EmailService emailService)
    {
        _userRepository = userRepository;
        _emailService = emailService;
    }

    private UserResponse MapUserResponse(User user) => new()
    {
        Id = user.Id!,
        Name = user.Name,
        Email = user.Email,
        Type = user.Type,
        ClientDetails = user.ClientDetails,
        CreatedBy = user.CreatedBy is null ? null : MapUserResponse(user.CreatedBy),
        CreatedAt = user.CreatedAt,
        UpdatedAt = user.UpdatedAt
    };

    private User MapUser(CreateUserRequest request) => new()
    {
        Name = request.Name,
        Email = request.Email,
        Type = request.Type,
        ClientDetails = request.ClientDetails,
        CreatedBy = null,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    };

    public async Task<ServiceResponse<List<UserResponse>>> GetUsersAsync(int page, int size)
    {
        var users = await _userRepository.GetAsync(page, size);

        if (users == null)
            return new ServiceResponse<List<UserResponse>>(false, message: "Erro ao buscar usuários");

        var usersResponse = users.Select(MapUserResponse).ToList();

        return new ServiceResponse<List<UserResponse>>(true, usersResponse, (int)HttpStatusCode.OK);
    }

    public async Task<ServiceResponse<UserResponse>> GetUserAsync(string id)
    {
        var user = await _userRepository.GetAsync(id);

        if (user == null)
            return new ServiceResponse<UserResponse>(false, (int)HttpStatusCode.NotFound, "Usuário não encontrado");

        return new ServiceResponse<UserResponse>(true, MapUserResponse(user));
    }

    public async Task<ServiceResponse<UserResponse>> CreateAsync(CreateUserRequest request, ClaimsPrincipal requestingUser)
    {
        var user = MapUser(request);
        var generatedPassword = AuthorizationUtils.GenerateRandomPassword();
        var hashedPassword = Hasher.Hash(generatedPassword);

        var creatorUser = await new AuthorizationUtils(_userRepository).GetRequestingUser(requestingUser);
        user.CreatedBy = creatorUser;
        user.Password = generatedPassword;

        await _userRepository.CreateAsync(user);

        var emailResponse = _emailService.SendEmail(request.Email,
            "Cadastro no PortalWeb",
            @$"<h2>Seu cadastro foi realizado com sucesso pelo colaborador!</h2>
            <p>Sua senha para entrar no sistema é: {generatedPassword}</p>
            <p>Por favor, altere esta senha assim que possível.</p>"
        );

        if (!emailResponse.Success)
        {
            return new ServiceResponse<UserResponse>(false, emailResponse.StatusCode, emailResponse.Message);
        }

        return new ServiceResponse<UserResponse>(success: true, MapUserResponse(user));
    }

    public async Task<ServiceResponse> UpdateAsync(string id, UpdateUserRequest request)
    {
        var user = await _userRepository.GetAsync(id);

        if (user == null)
            return new ServiceResponse(success: false, statusCode: (int)HttpStatusCode.NotFound, message: "Usuário não encontrado");

        var userToUpdate = new User
        {
            Name = String.IsNullOrWhiteSpace(request.Name) ? user.Name : request.Name,
            Email = String.IsNullOrWhiteSpace(request.Email) ? user.Email : request.Email,
            Type = request.Type is null ? user.Type : request.Type.Value,
            ClientDetails = request.ClientDetails is null ? user.ClientDetails : request.ClientDetails,
            CreatedBy = user.CreatedBy,
            CreatedAt = user.CreatedAt,
            UpdatedAt = DateTime.UtcNow
        };

        // adiciona o id do usuario que está sendo atualizado
        userToUpdate.Id = id;

        await _userRepository.UpdateAsync(id, userToUpdate);

        return new ServiceResponse(success: true);
    }

}
