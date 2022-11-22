using MongoDB.Driver;
using MongoDB.Bson;
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

    public async Task<List<CurrencyInformation>> GetIntervalCurrencyInformationAsync(DateTime? startDate, DateTime? endDate, int page, int size)
    {
        var start = startDate ?? DateTime.Now.Date;
        var end = endDate ?? DateTime.Now;

        var res = await _currencyInformationCollection.Find(x => x.Time >= start && x.Time <= end)
            .Skip((page - 1) * size)
            .Limit(size + 1)
            .ToListAsync();
        return res;
    }

    public async Task<CurrencyMeanMinMax?> GetIntervalCurrencyMeanMinMaxAsync(DateTime? startDate, DateTime? endDate)
    {
        var start = startDate ?? DateTime.Now.Date;
        var end = endDate ?? DateTime.Now;

        // get mean, max and min dollarExchangeRate 
        var res = await _currencyInformationCollection.Aggregate()
            .Match(x => x.Time >= start && x.Time <= end)
            .Group(x => 0, g => new CurrencyMeanMinMax
            {
                Mean = g.Average(x => x.DollarExchangeRate),
                Max = g.Max(x => x.DollarExchangeRate),
                Min = g.Min(x => x.DollarExchangeRate)
            })
            .FirstOrDefaultAsync();

        return res;
    }
}

public class CurrencyMeanMinMax
{
    public decimal? Mean { get; set; }
    public decimal Min { get; set; }
    public decimal Max { get; set; }
}