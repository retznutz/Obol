namespace Obol.Api.Games;

/// <summary>A playable game: an Emscripten ES module (<c>{Id}.mjs</c>) and its <c>{Id}.wasm</c>.</summary>
public sealed record GameInfo(string System, string Id, string Title, string ScriptUrl);

/// <summary>
/// Lists games from the games folder, laid out as <c>{root}/{system}/{id}.mjs + {id}.wasm</c>.
/// The folder is scanned on every call, so dropping in new files needs no restart.
/// </summary>
public sealed class GameCatalog(string root)
{
    public string Root { get; } = root;

    public IReadOnlyList<string> Systems() =>
        Directory.Exists(Root)
            ? Directory.EnumerateDirectories(Root)
                .Select(Path.GetFileName)
                .OfType<string>()
                .Where(name => !name.StartsWith('.'))
                .Order(StringComparer.OrdinalIgnoreCase)
                .ToList()
            : [];

    public IReadOnlyList<GameInfo> Games(string? system = null) =>
        Systems()
            .Where(s => system is null || string.Equals(s, system, StringComparison.OrdinalIgnoreCase))
            .SelectMany(GamesIn)
            .ToList();

    public GameInfo? Find(string system, string id) =>
        GamesIn(system).FirstOrDefault(g => string.Equals(g.Id, id, StringComparison.OrdinalIgnoreCase));

    private IEnumerable<GameInfo> GamesIn(string system)
    {
        var dir = Path.GetFullPath(Path.Combine(Root, system));
        // Reject anything that would escape the games root ("..", absolute paths).
        var rootPrefix = Path.TrimEndingDirectorySeparator(Path.GetFullPath(Root)) + Path.DirectorySeparatorChar;
        if (!dir.StartsWith(rootPrefix, StringComparison.Ordinal) || !Directory.Exists(dir))
            return [];

        return Directory.EnumerateFiles(dir, "*.mjs")
            .Where(script => File.Exists(Path.ChangeExtension(script, ".wasm")))
            .Select(script => Path.GetFileNameWithoutExtension(script))
            .Order(StringComparer.OrdinalIgnoreCase)
            .Select(id => new GameInfo(system, id, TitleFrom(id), $"/games/{system}/{id}.mjs"));
    }

    // "1942_interp" -> "1942", "altbeast_interp" -> "altbeast"
    private static string TitleFrom(string id) =>
        id.EndsWith("_interp", StringComparison.OrdinalIgnoreCase) ? id[..^"_interp".Length] : id;
}
