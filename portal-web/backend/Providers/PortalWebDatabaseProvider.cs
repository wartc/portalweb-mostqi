using MongoDB.Driver;
using Microsoft.Extensions.Options;
using PortalWeb.Models;

namespace PortalWeb.Providers;

public class PortalWebCollectionProvider
{
    private readonly IMongoDatabase _portalWebDatabase;

    public PortalWebCollectionProvider(IOptions<DBSettings> dbSettings)
    {
        var client = new MongoClient(dbSettings.Value.ConnectionURI);
        _portalWebDatabase = client.GetDatabase(dbSettings.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName) => _portalWebDatabase.GetCollection<T>(collectionName);

}
