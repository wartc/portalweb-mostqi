namespace PortalWeb.Contracts;

public record PaginatedResponse<T>
{
    public List<T> Data { get; set; } = null!;
    public bool HasNextPage { get; set; }
}