using MongoDB.Driver;
using PortalWeb.Models;
using PortalWeb.Data;

namespace PortalWeb.Repositories;

public class UserRepository
{
    const int MAX_PAGE_SIZE = 20;

    private readonly IMongoCollection<User> _userCollection;

    public UserRepository(DatabaseContext dbContext)
    {
        _userCollection = dbContext.GetCollection<User>("user");
    }

    public async Task<List<User>> GetAsync(int page, int size)
    {
        var pageSize = size <= MAX_PAGE_SIZE ? size : MAX_PAGE_SIZE;

        return await _userCollection.Find(_ => true).Skip(pageSize * (page - 1)).Limit(pageSize).ToListAsync();
    }

    public async Task<User> GetAsync(string id) => await _userCollection.Find(u => u.Id == id).FirstOrDefaultAsync();

    public async Task<User> FindByEmailAsync(string email) => await _userCollection.Find(u => u.Email == email).FirstOrDefaultAsync();

    public async Task CreateAsync(User newUser) => await _userCollection.InsertOneAsync(newUser);

    public async Task UpdateAsync(string id, User updatedUser) => await _userCollection.ReplaceOneAsync(u => u.Id == id, updatedUser);

}