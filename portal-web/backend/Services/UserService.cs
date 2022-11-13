using MongoDB.Driver;
using PortalWeb.Models;
using PortalWeb.Providers;

namespace PortalWeb.Services;

public class UserService
{
    private readonly IMongoCollection<User> _userCollection;

    public UserService(PortalWebCollectionProvider collectionProvider)
    {
        _userCollection = collectionProvider.GetCollection<User>("user");
    }

    public async Task<List<User>> GetAsync() => await _userCollection.Find(_ => true).ToListAsync();

}