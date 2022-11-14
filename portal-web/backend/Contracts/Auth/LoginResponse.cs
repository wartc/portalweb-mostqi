using System.Threading;
using System.Text.Json.Serialization;
using PortalWeb.Models;

namespace PortalWeb.Contracts.Auth;

public record LoginResponse
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public UserType Type { get; set; }

    public string Token { get; set; } = null!;
}