using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PortalWeb.Contracts.User;
using PortalWeb.Services;

namespace PortalWeb.Controllers;

[ApiController]
[Route("[controller]")]
public class ClientsController : ControllerBase
{
    private readonly ClientService _clientService;

    public ClientsController(ClientService clientService) => _clientService = clientService;

    [HttpGet]
    [Authorize(Roles = "CONTRIBUTOR")]
    public async Task<ActionResult<List<UserResponse>>> GetClients(int page, int size)
    {
        var response = await _clientService.GetClientsAsync(page, size);

        if (!response.Success || response.Data == null)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao buscar clientes");

        return response.Data;
    }

    [HttpGet("search")]
    [Authorize(Roles = "CONTRIBUTOR")]
    public async Task<ActionResult<List<UserResponse>>> GetClientsByName(string name, int page, int size)
    {
        var response = await _clientService.GetClientsByNameAsync(name, page, size);

        if (!response.Success || response.Data == null)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao buscar clientes");

        return response.Data;
    }
}