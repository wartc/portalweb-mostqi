using System.Text.Json.Serialization;
using PortalWeb.Models;

namespace PortalWeb.Contracts.User;

public record CreateUserRequest
{
    public string Name { get; init; } = null!;

    public string Email { get; init; } = null!;

    public UserClientDetailsRequest? ClientDetails { get; init; }
}

public record UserClientDetailsRequest
{
    public string SelfieB64 { get; init; } = null!;

    public string DocumentB64 { get; init; } = null!;

    public string Rg { get; init; } = null!;

    public DateTime Dob { get; init; }
}