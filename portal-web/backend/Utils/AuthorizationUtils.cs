using System.Security.Claims;
using PortalWeb.Repositories;
using PortalWeb.Models;

namespace PortalWeb.Utils;

public class AuthorizationUtils
{
    private readonly UserRepository _userRepository;

    public AuthorizationUtils(UserRepository userRepository) => _userRepository = userRepository;

    public static bool UserHasPermission(string id, ClaimsPrincipal user)
    {
        var userType = user.Claims.FirstOrDefault(c => c.Type == "type")?.Value;
        var requestingUserId = user.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (userType == UserType.CONTRIBUTOR.ToString()) return true;

        return requestingUserId == id;
    }

    public async Task<User?> GetRequestingUser(ClaimsPrincipal user)
    {
        var userId = user.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (string.IsNullOrWhiteSpace(userId)) return null;

        var requestingUser = await _userRepository.GetAsync(userId);

        return requestingUser;
    }
}