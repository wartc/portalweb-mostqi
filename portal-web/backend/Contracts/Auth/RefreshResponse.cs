
namespace PortalWeb.Contracts.Auth;

public record RefreshResponse
{
    public string Token { get; set; } = null!;
}