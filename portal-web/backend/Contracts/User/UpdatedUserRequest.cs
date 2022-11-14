using System.Text.Json.Serialization;
using PortalWeb.Models;

namespace PortalWeb.Contracts.User;

public record UpdateUserRequest
{
    public string? Name { get; init; }

    public string? Email { get; init; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public UserType? Type { get; init; }

    public UserClientDetails? ClientDetails { get; init; }
}