using PortalWeb.Contracts.User;

namespace PortalWeb.Contracts.Auth;

public record LoginResponse
{
    public UserResponse User { get; set; } = null!;

    public string Token { get; set; } = null!;
}