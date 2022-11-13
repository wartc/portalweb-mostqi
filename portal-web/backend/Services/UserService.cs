using System.Net;
using PortalWeb.Models;
using PortalWeb.Repositories;

namespace PortalWeb.Services;

public class UserService
{
    private readonly UserRepository _userRepository;

    public UserService(UserRepository userRepository) => _userRepository = userRepository;

    public async Task<ServiceResponse<List<User>>> GetUsersAsync()
    {
        var users = await _userRepository.GetAsync();

        if (users == null)
            return new ServiceResponse<List<User>>(false, message: "Erro ao buscar usuários");

        return new ServiceResponse<List<User>>(true, users, (int)HttpStatusCode.OK);
    }

    public async Task<ServiceResponse<User>> GetUserAsync(string id)
    {
        var user = await _userRepository.GetAsync(id);

        if (user == null)
            return new ServiceResponse<User>(false, (int)HttpStatusCode.NotFound, "Usuário não encontrado");

        return new ServiceResponse<User>(true, user);
    }

    public async Task<ServiceResponse> CreateAsync(User newUser)
    {
        await _userRepository.CreateAsync(newUser);

        return new ServiceResponse(success: true);
    }

    public async Task<ServiceResponse> UpdateAsync(string id, User updatedUser)
    {
        if (updatedUser.Id != id)
            return new ServiceResponse(success: false, statusCode: (int)HttpStatusCode.BadRequest, message: "ID do usuário não confere");

        var user = await _userRepository.GetAsync(id);

        if (user == null)
            return new ServiceResponse(success: false, statusCode: (int)HttpStatusCode.NotFound, message: "Usuário não encontrado");

        // adiciona o id do usuário caso nao tenha sido informado no body
        if (updatedUser.Id is null)
            updatedUser.Id = id;

        await _userRepository.UpdateAsync(id, updatedUser);

        return new ServiceResponse(success: true);
    }

}
