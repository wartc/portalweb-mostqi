using Microsoft.AspNetCore.Mvc;

namespace PortalWeb.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return NoContent();
    }
}