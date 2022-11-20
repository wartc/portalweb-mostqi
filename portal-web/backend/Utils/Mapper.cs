using PortalWeb.Contracts.User;
using PortalWeb.Models;

namespace PortalWeb.Utils;

public static class Mapper
{
    public static UserResponse MapUserResponse(User user) => new()
    {
        Id = user.Id!,
        Name = user.Name,
        Email = user.Email,
        Type = user.Type,
        ClientDetails = user.ClientDetails,
        CreatedBy = user.CreatedBy is null ? null : MapUserResponse(user.CreatedBy),
        CreatedAt = user.CreatedAt,
        UpdatedAt = user.UpdatedAt
    };

    public static PaginatedUserResponse MapPaginatedUserResponse(List<User> users, bool hasNextPage) => new()
    {
        Users = users.Select(MapUserResponse).ToList(),
        HasNextPage = hasNextPage
    };

    public static User MapUser(CreateUserRequest request) => new()
    {
        Name = request.Name,
        Email = request.Email,
        Type = UserType.CLIENT,
        ClientDetails = request.ClientDetails,
        CreatedBy = null,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    };
}