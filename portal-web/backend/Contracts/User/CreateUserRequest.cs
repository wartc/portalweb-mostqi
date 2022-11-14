using System.Text.Json.Serialization;
using PortalWeb.Models;

namespace PortalWeb.Contracts.User;

public record CreateUserRequest
{
    public string Name { get; init; } = null!;

    public string Email { get; init; } = null!;

    public string Password { get; init; } = null!;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public UserType Type { get; init; }

    public UserClientDetails? ClientDetails { get; init; }
}