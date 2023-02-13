using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] //localhost:5000/weatherforecast

    public class BaseApiController : ControllerBase
    {
        // we create a mediator property which we will populate with the Mediator service 
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= 
            HttpContext.RequestServices.GetService<IMediator>();
    }
}