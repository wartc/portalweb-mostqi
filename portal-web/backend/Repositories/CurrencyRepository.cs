using MongoDB.Driver;
using PortalWeb.Data;
using PortalWeb.Models;

namespace PortalWeb.Repositories;

public class CurrencyRepository
{
    private readonly IMongoCollection<CurrencyInformation> _currencyInformationCollection;

    public CurrencyRepository(DatabaseContext _databaseContext)
    {
        _currencyInformationCollection = _databaseContext.GetCollection<CurrencyInformation>("currencyExchange");
    }

    public async Task StoreCurrencyExchangeInfo(CurrencyInformation currencyInformation) =>
        await _currencyInformationCollection.InsertOneAsync(currencyInformation);
}