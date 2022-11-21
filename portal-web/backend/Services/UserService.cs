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
    private readonly ImageRepository _imageRepository;

    public UserService(UserRepository userRepository, EmailService emailService, ImageRepository imageRepository)
    {
        _userRepository = userRepository;
        _emailService = emailService;
        _imageRepository = imageRepository;
    }

    public async Task<ServiceResponse<PaginatedUserResponse>> GetUsersAsync(int page, int size)
    {
        var users = await _userRepository.GetAsync(page, size);

        if (users == null)
            return new ServiceResponse<PaginatedUserResponse>(false, message: "Erro ao buscar usuários");

        bool hasNextPage = false;

        if (users.Count > size)
        {
            hasNextPage = true;
            users.RemoveAt(users.Count - 1);
        }

        var usersResponse = Mapper.MapPaginatedUserResponse(users, hasNextPage);

        return new ServiceResponse<PaginatedUserResponse>(true, usersResponse, (int)HttpStatusCode.OK);
    }

    public async Task<ServiceResponse<UserResponse>> GetUserAsync(string id, ClaimsPrincipal requestingUser)
    {
        if (!AuthorizationUtils.UserHasPermission(id, requestingUser))
            return new ServiceResponse<UserResponse>(false, 403, message: "Você não tem permissão para acessar esse usuário");

        var user = await _userRepository.GetAsync(id);

        if (user == null)
            return new ServiceResponse<UserResponse>(false, (int)HttpStatusCode.NotFound, "Usuário não encontrado");

        return new ServiceResponse<UserResponse>(true, Mapper.MapUserResponse(user));
    }

    public async Task<ServiceResponse<UserResponse>> CreateAsync(CreateUserRequest request, ClaimsPrincipal requestingUser)
    {
        var existingEmail = await _userRepository.FindByEmailAsync(request.Email);

        if (existingEmail != null)
            return new ServiceResponse<UserResponse>(false, 400, "Email já cadastrado");

        // upload files to cloudinary
        var randomToken = Guid.NewGuid().ToString();
        var selfieUrl = await _imageRepository.UploadImageAsync($"selfie_{randomToken}", request.ClientDetails!.SelfieB64);
        var documentUrl = await _imageRepository.UploadImageAsync($"document_{randomToken}", request.ClientDetails!.DocumentB64);

        var user = Mapper.MapUser(request, selfieUrl, documentUrl);
        var generatedPassword = Hasher.GenerateRandomPassword();
        var hashedPassword = Hasher.Hash(generatedPassword);

        var creatorUser = await new AuthorizationUtils(_userRepository).GetRequestingUser(requestingUser);
        user.CreatedBy = creatorUser;
        user.Password = hashedPassword;

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

        return new ServiceResponse<UserResponse>(success: true, Mapper.MapUserResponse(user));
    }

    public async Task<ServiceResponse> UpdateAsync(string id, UpdateUserRequest request, ClaimsPrincipal requestingUser)
    {
        if (!AuthorizationUtils.UserHasPermission(id, requestingUser))
            return new ServiceResponse(false, 403, message: "Você não tem permissão para editar esse usuário");

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
