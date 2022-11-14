using MongoDB.Bson.Serialization.Attributes;

namespace PortalWeb.Models;

public class UserClientDetails
{
    public string SelfieUrl { set; get; } = null!;

    public string DocumentUrl { set; get; } = null!;

    public string Rg { set; get; } = null!;

    public DateTime Dob { set; get; }

}