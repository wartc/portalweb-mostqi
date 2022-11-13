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
    public async Task<List<User>> Get() => await _userService.GetAsync();

    [HttpGet("{id}")]
    public async Task<User> Get(string id) => await _userService.GetAsync(id);

    [HttpPost]
    public async Task<IActionResult> Post(User user)
    {
        await _userService.CreateAsync(user);

        return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, User user)
    {
        await _userService.UpdateAsync(id, user);

        return NoContent();
    }

}