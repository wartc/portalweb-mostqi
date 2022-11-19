using System.Security.Claims;
using PortalWeb.Repositories;
using PortalWeb.Models;

namespace PortalWeb.Utils;

public class AuthorizationUtils
{
    private readonly UserRepository _userRepository;

    public AuthorizationUtils(UserRepository userRepository) => _userRepository = userRepository;


    public async Task<User?> GetRequestingUser(ClaimsPrincipal user)
    {
        var userId = user.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (string.IsNullOrWhiteSpace(userId)) return null;

        var requestingUser = await _userRepository.GetAsync(userId);

        return requestingUser;
    }

    public static string GenerateRandomPassword()
    {
        Random random = new();
        const string charset = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?";
        return new string(Enumerable.Repeat(charset, 12)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }
}