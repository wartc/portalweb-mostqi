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

    public async Task<List<CurrencyInformation>> GetDayCurrencyInformationAsync(DateTime day, int page, int size) =>
        await _currencyInformationCollection.Find(x => x.Time >= day.Date && x.Time <= day.Date.AddDays(1))
            .Skip((page - 1) * size)
            .Limit(size + 1)
            .ToListAsync();
}