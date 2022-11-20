namespace PortalWeb.Contracts.User;

public class PaginatedUserResponse
{
    public List<UserResponse> Users { get; set; } = null!;
    public bool HasNextPage { get; set; }
}