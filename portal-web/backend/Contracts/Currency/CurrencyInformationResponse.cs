namespace PortalWeb.Contracts.Currency;

public record CurrencyInformationResponse
{
    public DateTime Time { get; set; }

    public decimal DollarExchangeRate { get; set; }

}