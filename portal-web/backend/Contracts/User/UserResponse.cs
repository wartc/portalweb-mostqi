using System.Text.Json.Serialization;
using PortalWeb.Models;

namespace PortalWeb.Contracts.User;

public record UserResponse
{
    public string Id { get; init; } = null!;

    public string Name { get; init; } = null!;

    public string Email { get; init; } = null!;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public UserType Type { get; init; }

    public UserClientDetails? ClientDetails { get; init; }

    public UserResponse? CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}