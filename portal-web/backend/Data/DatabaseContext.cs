using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace PortalWeb.Data;

public class DatabaseContext
{
    private readonly IMongoDatabase _portalWebDatabase;

    public DatabaseContext(IOptions<DBSettings> dbSettings)
    {
        var client = new MongoClient(dbSettings.Value.ConnectionURI);
        _portalWebDatabase = client.GetDatabase(dbSettings.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName) => _portalWebDatabase.GetCollection<T>(collectionName);

}