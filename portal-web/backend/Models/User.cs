using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PortalWeb.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public UserType Type { get; set; }

    public UserClientDetails? ClientDetails { set; get; }

    public User? CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

}

public enum UserType
{
    [BsonRepresentation(BsonType.String)]
    CONTRIBUTOR,

    [BsonRepresentation(BsonType.String)]
    CLIENT
}