namespace PortalWeb.Contracts.Auth;

public record LoginRequest
{
    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
}