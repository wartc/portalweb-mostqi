using PortalWeb.Contracts.User;
using PortalWeb.Services;
using PortalWeb.Models;
using Microsoft.AspNetCore.Mvc;

namespace PortalWeb.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;

    public UsersController(UserService userService) => _userService = userService;

    [HttpGet]
    public async Task<ActionResult<List<UserResponse>>> Get(int page, int size)
    {
        var response = await _userService.GetUsersAsync(page, size);

        if (!response.Success || response.Data == null)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao buscar usuários");

        return (List<UserResponse>)response.Data;
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<UserResponse>> Get(string id)
    {
        var response = await _userService.GetUserAsync(id);

        if (!response.Success || response.Data == null)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao buscar usuário");

        return (UserResponse)response.Data;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateUserRequest request)
    {
        var response = await _userService.CreateAsync(request);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao criar usuário");

        return CreatedAtAction(nameof(Get), new { id = response.Data!.Id }, response.Data);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, UpdateUserRequest request)
    {
        var response = await _userService.UpdateAsync(id, request);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao atualizar usuário");

        return Ok();
    }

}