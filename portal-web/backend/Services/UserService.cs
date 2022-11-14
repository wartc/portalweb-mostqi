using System.Net;
using PortalWeb.Contracts.User;
using PortalWeb.Models;
using PortalWeb.Repositories;

namespace PortalWeb.Services;

public class UserService
{
    private readonly UserRepository _userRepository;

    public UserService(UserRepository userRepository) => _userRepository = userRepository;

    private UserResponse MapUserResponse(User user) => new()
    {
        Id = user.Id!,
        Name = user.Name,
        Email = user.Email,
        Type = user.Type,
        ClientDetails = user.ClientDetails
    };

    private User MapUser(CreateUserRequest request) => new()
    {
        Name = request.Name,
        Email = request.Email,
        Password = request.Password,
        Type = request.Type,
        ClientDetails = request.ClientDetails
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

    public async Task<ServiceResponse<UserResponse>> CreateAsync(CreateUserRequest request)
    {
        var user = MapUser(request);

        await _userRepository.CreateAsync(user);

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
            ClientDetails = request.ClientDetails is null ? user.ClientDetails : request.ClientDetails
        };

        // adiciona o id do usuario que está sendo atualizado
        userToUpdate.Id = id;

        await _userRepository.UpdateAsync(id, userToUpdate);

        return new ServiceResponse(success: true);
    }

}
