using System.Diagnostics;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Activities;
using Domain;

namespace Application.Activities
{
    public class Create
    {
        // queries return data and commands do not
        public class Command : IRequest
        {
            public Domain.Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}