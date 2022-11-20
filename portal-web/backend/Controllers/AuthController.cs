using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PortalWeb.Contracts.Auth;
using PortalWeb.Services;

namespace PortalWeb.Controllers;

[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService) => _authService = authService;

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var serviceResponse = await _authService.LoginAsync(request);

        if (!serviceResponse.Success)
            return Problem(statusCode: serviceResponse.StatusCode ?? 500, title: serviceResponse.Message ?? "Erro ao realizar login");

        _authService.SetRefreshTokenCookie(Response, serviceResponse.Data!.User.Id);

        return Ok(serviceResponse.Data);
    }

    [HttpGet]
    [Route("refresh")]
    [Authorize]
    public async Task<ActionResult<RefreshResponse>> Refresh()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        if (string.IsNullOrEmpty(refreshToken))
            return Problem(statusCode: 401, title: "Token inválido ou expirado");

        var response = await _authService.RefreshAsync(Request.Cookies["refreshToken"]!, User);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode ?? 500, title: response.Message ?? "Erro ao realizar refresh");

        _authService.SetRefreshTokenCookie(Response, User.Claims.FirstOrDefault(c => c.Type == "id")!.Value);

        return Ok(response.Data);
    }
}