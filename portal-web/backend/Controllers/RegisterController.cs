using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PortalWeb.Contracts.Register;
using PortalWeb.Services;

namespace PortalWeb.Controllers;

[ApiController]
public class RegisterController : ControllerBase
{
    private readonly RegisterService _registerService;

    public RegisterController(RegisterService registerService) => _registerService = registerService;

    [HttpPost]
    [Route("register")]
    [AllowAnonymous]
    public async Task<ActionResult<RegisterResponse>> Register(RegisterRequest request)
    {
        var response = await _registerService.RegisterAsync(request);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode ?? 500, title: response.Message ?? "Erro ao registrar usuário");

        return Ok(response.Data);
    }
}