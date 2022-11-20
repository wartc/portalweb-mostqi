namespace PortalWeb.Contracts.User;

public class PaginatedUserResponse
{
    public List<UserResponse> Data { get; set; } = null!;
    public bool HasNextPage { get; set; }
}