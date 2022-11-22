using System.Net;
using PortalWeb.Contracts;
using PortalWeb.Contracts.Currency;
using PortalWeb.Repositories;
using PortalWeb.Utils;

namespace PortalWeb.Services;

public class CurrencyInformationService
{
    private readonly CurrencyRepository _currencyRepository;

    public CurrencyInformationService(CurrencyRepository currencyRepository) => _currencyRepository = currencyRepository;

    public async Task<ServiceResponse<PaginatedResponse<CurrencyInformationResponse>>> GetIntervalCurrencyInformationAsync(DateTime? startDate, DateTime? endDate, int page, int size)
    {
        var currencyInformations = await _currencyRepository.GetIntervalCurrencyInformationAsync(startDate, endDate, page, size);

        if (currencyInformations == null)
        {
            return new ServiceResponse<PaginatedResponse<CurrencyInformationResponse>>(false, message: "Não foi possível obter as informações do intervalo");
        }

        bool hasNextPage = false;

        if (currencyInformations.Count > size)
        {
            hasNextPage = true;
            currencyInformations.RemoveAt(currencyInformations.Count - 1);
        }

        var currencyInformationsResponse = Mapper.MapPaginatedCurrencyInformationResponse(currencyInformations, hasNextPage);

        return new ServiceResponse<PaginatedResponse<CurrencyInformationResponse>>(true, currencyInformationsResponse, (int)HttpStatusCode.OK);
    }

    public async Task<ServiceResponse<CurrencyMeanMinMaxResponse>> GetIntervalCurrencyMeanMinMaxAsync(DateTime? startDate, DateTime? endDate)
    {
        var currencyMeanMinMax = await _currencyRepository.GetIntervalCurrencyMeanMinMaxAsync(startDate, endDate);

        if (currencyMeanMinMax == null)
        {
            return new ServiceResponse<CurrencyMeanMinMaxResponse>(false, message: "Não foi possível obter as informações do intervalo");
        }

        return new ServiceResponse<CurrencyMeanMinMaxResponse>(true, new()
        {
            Mean = currencyMeanMinMax.Mean,
            Min = currencyMeanMinMax.Min,
            Max = currencyMeanMinMax.Max
        }, (int)HttpStatusCode.OK);
    }
}