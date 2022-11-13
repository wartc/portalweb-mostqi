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
    public async Task<ActionResult<List<User>>> Get()
    {
        var response = await _userService.GetUsersAsync();

        if (!response.Success || response.Data == null)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao buscar usuários");

        return (List<User>)response.Data;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var response = await _userService.GetUserAsync(id);

        if (!response.Success || response.Data == null)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao buscar usuário");

        return (User)response.Data;
    }

    [HttpPost]
    public async Task<IActionResult> Create(User user)
    {
        var response = await _userService.CreateAsync(user);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao criar usuário");

        return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, User user)
    {
        var response = await _userService.UpdateAsync(id, user);

        if (!response.Success)
            return Problem(statusCode: response.StatusCode, title: response.Message ?? "Erro ao atualizar usuário");

        return Ok();
    }

}