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

}