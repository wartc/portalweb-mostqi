using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PortalWeb.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = null!;

    public int Age { get; set; }

}