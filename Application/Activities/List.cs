using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        // we pass a query which forms a request : Line 22
        public class Query : IRequest<List<Activity>> {}
        // The query is then passed to this handler
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, ILogger<List>)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // and then it returns the data that we specify we looking for : Line 11 (IRequest)
                return await _context.Activities.ToListAsync();
                // eventually we return the list of activities
            }
        }
    }
}