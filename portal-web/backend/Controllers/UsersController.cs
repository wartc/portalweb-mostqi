using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalWeb.Contracts.User;
using PortalWeb.Contracts;
using PortalWeb.Services;

namespace PortalWeb.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;

    public UsersController(UserService userService) => _userService = userService;

    [HttpGet]
    [Authorize(Roles = "CONTRIBUTOR")]
    public async Task<ActionResult<PaginatedResponse<UserResponse>>> Get(int page, int size)
    {
        var response = await _userService.GetUsersAsync(page, size);

        if (!response.Success || response.Data == null)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao buscar usuários");

        return response.Data;
    }

    [HttpGet("{id:length(24)}")]
    [Authorize]
    public async Task<ActionResult<UserResponse>> Get(string id)
    {
        var response = await _userService.GetUserAsync(id, User);

        if (!response.Success || response.Data == null)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao buscar usuário");

        return response.Data;
    }

    [HttpPost]
    [Authorize(Roles = "CONTRIBUTOR")]
    public async Task<IActionResult> Create(CreateUserRequest request)
    {
        var response = await _userService.CreateAsync(request, User);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao criar usuário");

        return CreatedAtAction(nameof(Get), new { id = response.Data!.Id }, response.Data);
    }

    [HttpPut("{id:length(24)}")]
    [Authorize]
    public async Task<IActionResult> Update(string id, UpdateUserRequest request)
    {
        var response = await _userService.UpdateAsync(id, request, User);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao atualizar usuário");

        return Ok();
    }

}