using PortalWeb.Models;
using PortalWeb.Repositories;

namespace PortalWeb.Services;

public class UserService
{
    private readonly UserRepository _userRepository;

    public UserService(UserRepository userRepository) => _userRepository = userRepository;

    public async Task<List<User>> GetUsersAsync() => await _userRepository.GetAsync();

    public async Task<User> GetUserAsync(string id)
    {
        var user = await _userRepository.GetAsync(id);

        if (user == null)
            throw new Exception("User not found");

        return user;
    }

    public async Task CreateAsync(User newUser) => await _userRepository.CreateAsync(newUser);

    public async Task UpdateAsync(string id, User updatedUser)
    {
        var user = await _userRepository.GetAsync(id);

        if (user == null)
            throw new Exception("User not found");

        if (updatedUser.Id == null)
            updatedUser.Id = id;

        await _userRepository.UpdateAsync(id, updatedUser);
    }

}