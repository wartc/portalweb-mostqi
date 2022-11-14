using PortalWeb.Contracts.Auth;
using PortalWeb.Services;
using Microsoft.AspNetCore.Mvc;

namespace PortalWeb.Controllers;

[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService) => _authService = authService;

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode ?? 500, title: response.Message ?? "Erro ao realizar login");

        return Ok(response.Data);
    }
}