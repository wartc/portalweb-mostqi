using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalWeb.Contracts.Account;
using PortalWeb.Services;

namespace PortalWeb.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly AccountService _accountService;

    public AccountController(AccountService accountService) => _accountService = accountService;

    [HttpPost]
    [Route("password")]
    [Authorize]
    public async Task<ActionResult> ChangePassword(ChangePasswordRequest request)
    {
        var response = await _accountService.ChangePasswordAsync(request, User);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode ?? 500, title: response.Message ?? "Erro ao alterar senha");

        return Ok();
    }
}