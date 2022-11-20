using System.Text.Json.Serialization;
using PortalWeb.Models;

namespace PortalWeb.Contracts.User;

public record CreateUserRequest
{
    public string Name { get; init; } = null!;

    public string Email { get; init; } = null!;

    public UserClientDetails? ClientDetails { get; init; }
}