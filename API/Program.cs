using Persistence;
using Microsoft.EntityFrameworkCore;
using API.Extensions;

// Entry point for the app
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

var app = builder.Build();

// Configure the HTTP request pipeline.
//? MIDDLEWARE (things that can do something with the http request on its way in or on its way out)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

// the using variable means that the variable will be destroyed as soon as the following code is executed
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>> ();
    logger.LogError(ex, "An error occurred during migration");
    Console.WriteLine(logger);
}

app.Run();
