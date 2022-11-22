using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PortalWeb.Models;

public class CurrencyInformation
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonRequired]
    public DateTime Time { get; set; }

    [BsonRequired]
    public decimal DollarExchangeRate { get; set; }
}