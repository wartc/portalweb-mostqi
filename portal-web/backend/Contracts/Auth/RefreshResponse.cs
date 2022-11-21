using PortalWeb.Contracts.User;

namespace PortalWeb.Contracts.Auth;

public record RefreshResponse
{
    public UserResponse User { get; set; } = null!;

    public string Token { get; set; } = null!;
}