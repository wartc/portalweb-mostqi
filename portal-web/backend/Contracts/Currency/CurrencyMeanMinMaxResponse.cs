namespace PortalWeb.Contracts.Currency;

public record CurrencyMeanMinMaxResponse
{
    public decimal? Mean { get; init; }

    public decimal Min { get; init; }

    public decimal Max { get; init; }
}