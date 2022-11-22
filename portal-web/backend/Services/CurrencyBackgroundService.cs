using System.Text.Json;
using System.Text.Json.Serialization;
using RestSharp;
using PortalWeb.Repositories;

namespace PortalWeb.Services;

public class CurrencyBackgroundService : BackgroundService
{
    private readonly CurrencyRepository _currencyRepository;

    private readonly RestClient _restClient;

    public CurrencyBackgroundService(CurrencyRepository currencyRepository)
    {
        _currencyRepository = currencyRepository;
        _restClient = new RestClient("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    }

    private decimal GetCurrentDollarValue()
    {
        var response = _restClient.Execute(new RestRequest());
        var content = response.Content;

        if (content is null)
            throw new Exception("Could not get dollar value");

        var res = JsonSerializer.Deserialize<ExchangeApiResponse>(content)!;
        return decimal.Parse(res.Exchange.Bid);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await _currencyRepository.StoreCurrencyExchangeInfo(new()
            {
                Time = DateTime.UtcNow,
                DollarExchangeRate = GetCurrentDollarValue()
            });

            await Task.Delay(60 * 1000, stoppingToken);
        }
    }
}

public class ExchangeApiResponse
{
    [JsonPropertyName("USDBRL")]
    public ExchangeApiResponseCurrencyItem Exchange { get; set; } = null!;
}

public class ExchangeApiResponseCurrencyItem
{
    [JsonPropertyName("code")]
    public string Code { get; set; } = null!;

    [JsonPropertyName("codein")]
    public string Codein { get; set; } = null!;

    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [JsonPropertyName("high")]
    public string High { get; set; } = null!;

    [JsonPropertyName("low")]
    public string Low { get; set; } = null!;

    [JsonPropertyName("varBid")]
    public string VarBid { get; set; } = null!;

    [JsonPropertyName("pctChange")]
    public string PctChange { get; set; } = null!;

    [JsonPropertyName("bid")]
    public string Bid { get; set; } = null!;

    [JsonPropertyName("ask")]
    public string Ask { get; set; } = null!;

    [JsonPropertyName("timestamp")]
    public string Timestamp { get; set; } = null!;

    [JsonPropertyName("create_date")]
    public string CreateDate { get; set; } = null!;
}