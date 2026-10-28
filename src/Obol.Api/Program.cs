using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using Obol.Api.Games;

var builder = WebApplication.CreateBuilder(args);

var gamesRoot = Path.GetFullPath(Path.Combine(
    builder.Environment.ContentRootPath,
    builder.Configuration["Games:Root"] ?? "games"));
builder.Services.AddSingleton(new GameCatalog(gamesRoot));

var app = builder.Build();

// Game files: /games/{system}/{id}.mjs and .wasm. Browsers need text/javascript
// for module scripts and application/wasm for streaming compilation.
var contentTypes = new FileExtensionContentTypeProvider();
contentTypes.Mappings[".mjs"] = "text/javascript";
contentTypes.Mappings[".wasm"] = "application/wasm";
Directory.CreateDirectory(gamesRoot);
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(gamesRoot),
    RequestPath = "/games",
    ContentTypeProvider = contentTypes,
});

// The generated Nuxt site (published builds; in development SpaProxy redirects to the Nuxt dev server).
app.UseDefaultFiles();
app.UseStaticFiles();

var api = app.MapGroup("/api");
api.MapGet("/systems", (GameCatalog catalog) => catalog.Systems());
api.MapGet("/games", (GameCatalog catalog, string? system) => catalog.Games(system));
api.MapGet("/games/{system}/{id}", (GameCatalog catalog, string system, string id) =>
    catalog.Find(system, id) is { } game ? Results.Ok(game) : Results.NotFound());

app.MapFallbackToFile("index.html");

app.Run();
