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

    public async Task<ServiceResponse<PaginatedResponse<CurrencyInformationResponse>>> GetDayCurrencyInformationAsync(DateTime? startDate, DateTime? endDate, int page, int size)
    {
        var currencyInformations = await _currencyRepository.GetDayCurrencyInformationAsync(startDate, endDate, page, size);

        if (currencyInformations == null)
        {
            return new ServiceResponse<PaginatedResponse<CurrencyInformationResponse>>(false, message: "Não foi possível obter as informações do dia");
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
}