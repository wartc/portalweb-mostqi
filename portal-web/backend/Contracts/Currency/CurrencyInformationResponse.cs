namespace PortalWeb.Contracts.Currency;

public record CurrencyInformationResponse
{
    public DateTime Time { get; set; }

    public Decimal DollarExchangeRate { get; set; }
}