using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ServiceFilter(typeof(LogUserActivite))]
[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{

}
