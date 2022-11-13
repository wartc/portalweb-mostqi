using MongoDB.Driver;
using PortalWeb.Models;
using PortalWeb.Data;

namespace PortalWeb.Services;

public class UserService
{
    private readonly IMongoCollection<User> _userCollection;

    public UserService(DatabaseContext dbContext)
    {
        _userCollection = dbContext.GetCollection<User>("user");
    }

    public async Task<List<User>> GetAsync() => await _userCollection.Find(_ => true).ToListAsync();

    public async Task<User> GetAsync(string id) => await _userCollection.Find(u => u.Id == id).FirstAsync();

    public async Task CreateAsync(User newUser) => await _userCollection.InsertOneAsync(newUser);

    public async Task UpdateAsync(string id, User updatedUser) => await _userCollection.ReplaceOneAsync(u => u.Id == id, updatedUser);

}