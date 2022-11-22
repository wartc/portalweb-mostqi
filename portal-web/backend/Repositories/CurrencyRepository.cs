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

    public async Task<List<CurrencyInformation>> GetDayCurrencyInformationAsync(DateTime? startDate, DateTime? endDate, int page, int size)
    {
        var start = startDate ?? DateTime.Now.Date;
        var end = endDate ?? DateTime.Now;

        var res = await _currencyInformationCollection.Find(x => x.Time >= start && x.Time <= end)
            .Skip((page - 1) * size)
            .Limit(size + 1)
            .ToListAsync();
        return res;
    }
}