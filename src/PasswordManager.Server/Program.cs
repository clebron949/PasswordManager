using Microsoft.AspNetCore.Http.HttpResults;
using PasswordManager.Server.PasswordStore;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new NullReferenceException("Could not find connection string");

builder.Services.AddOpenApi();
builder.Services.AddScoped<PasswordStoreRepository>(opts => new PasswordStoreRepository(
    connectionString
));

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet(
        "/api/passwords",
        async (PasswordStoreRepository passwordStore, ILogger<Program> logger) =>
        {
            try
            {
                var passwords = await passwordStore.GetAll();
                return Results.Ok(passwords);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while getting passwords");
                return Results.InternalServerError();
            }
        }
    )
    .WithName("GetAllPasswords");

app.MapGet(
        "/api/passwords/{id}",
        async (int id, PasswordStoreRepository passwordStore, ILogger<Program> logger) =>
        {
            try
            {
                var password = await passwordStore.Get(id);
                if (password == null)
                {
                    return Results.NotFound();
                }
                return Results.Ok(password);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while getting password with id {Id}", id);
                return Results.InternalServerError();
            }
        }
    )
    .WithName("GetPasswordById");

app.MapPost(
        "/api/passwords",
        async (
            PasswordStoreModel password,
            PasswordStoreRepository passwordStore,
            ILogger<Program> logger
        ) =>
        {
            try
            {
                await passwordStore.Add(password);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while creating password");
                return Results.InternalServerError();
            }
        }
    )
    .WithName("CreatePassword");

app.MapPut(
        "/api/passwords/{id}",
        async (
            int id,
            PasswordStoreModel password,
            PasswordStoreRepository passwordStore,
            ILogger<Program> logger
        ) =>
        {
            try
            {
                await passwordStore.Update(password);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while updating password with id {Id}", id);
                return Results.InternalServerError();
            }
        }
    )
    .WithName("UpdatePassword");

app.MapDelete(
        "/api/passwords/{id}",
        async (int id, PasswordStoreRepository passwordStore, ILogger<Program> logger) =>
        {
            try
            {
                await passwordStore.Delete(id);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while deleting password with id {Id}", id);
                return Results.InternalServerError();
            }
        }
    )
    .WithName("DeletePassword");

app.MapFallbackToFile("/index.html");
app.Run();
