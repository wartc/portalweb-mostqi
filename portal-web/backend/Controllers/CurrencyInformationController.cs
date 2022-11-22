using Microsoft.AspNetCore.Mvc;
using PortalWeb.Contracts;
using PortalWeb.Contracts.Currency;
using PortalWeb.Services;

namespace PortalWeb.Controllers;

[ApiController]
[Route("/currency")]
public class CurrencyInformationController : ControllerBase
{
    private readonly CurrencyInformationService _currencyInformationService;

    public CurrencyInformationController(CurrencyInformationService currencyInformationService) => _currencyInformationService = currencyInformationService;

    [HttpGet]
    public async Task<ActionResult<PaginatedResponse<CurrencyInformationResponse>>> GetDayCurrencyInformationAsync(DateTime? startDate, DateTime? endDate, int page, int size)
    {
        var response = await _currencyInformationService.GetDayCurrencyInformationAsync(startDate, endDate, page, size);

        if (!response.Success || response.Data == null)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao buscar informações de moedas");

        return response.Data;
    }
}