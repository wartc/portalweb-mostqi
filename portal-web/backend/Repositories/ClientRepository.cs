using MongoDB.Bson;
using MongoDB.Driver;
using PortalWeb.Models;
using PortalWeb.Data;

namespace PortalWeb.Repositories;

public class ClientRepository
{
    public const int MAX_PAGE_SIZE = 20;

    private readonly IMongoCollection<User> _userCollection;

    public ClientRepository(DatabaseContext dbContext)
    {
        _userCollection = dbContext.GetCollection<User>("user");
    }

    public async Task<List<User>> GetClientsAsync(int page, int size)
    {
        var pageSize = Math.Min(size, MAX_PAGE_SIZE);

        return await _userCollection.Find(u => u.Type == UserType.CLIENT).Skip(pageSize * (page - 1)).Limit(pageSize + 1).ToListAsync();
    }

    public async Task<List<User>> GetClientsByNameAsync(string name, int page, int size)
    {
        var pageSize = Math.Min(size, MAX_PAGE_SIZE);
        var filter = Builders<User>.Filter.Regex("name", new BsonRegularExpression(name, "i"))
            & Builders<User>.Filter.Eq("type", UserType.CLIENT);

        return await _userCollection.Find(filter).Skip(pageSize * (page - 1)).Limit(pageSize + 1).ToListAsync();
    }

}