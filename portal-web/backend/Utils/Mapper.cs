using PortalWeb.Contracts;
using PortalWeb.Contracts.User;
using PortalWeb.Contracts.Auth;
using PortalWeb.Contracts.Register;
using PortalWeb.Contracts.Currency;
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

    public static CurrencyInformationResponse MapCurrencyInformationResponse(CurrencyInformation currencyInformation) => new()
    {
        Time = currencyInformation.Time,
        DollarExchangeRate = currencyInformation.DollarExchangeRate,
    };

    public static PaginatedResponse<UserResponse> MapPaginatedUserResponse(List<User> users, bool hasNextPage) => new()
    {
        Data = users.Select(MapUserResponse).ToList(),
        HasNextPage = hasNextPage
    };

    public static PaginatedResponse<CurrencyInformationResponse> MapPaginatedCurrencyInformationResponse(List<CurrencyInformation> currencyInformations, bool hasNextPage) => new()
    {
        Data = currencyInformations.Select(MapCurrencyInformationResponse).ToList(),
        HasNextPage = hasNextPage
    };

    public static User MapUser(CreateUserRequest request, string uploadedSelfieUrl, string uploadedDocumentUrl) => new()
    {
        Name = request.Name,
        Email = request.Email,
        Type = UserType.CLIENT,
        ClientDetails = new()
        {
            SelfieUrl = uploadedSelfieUrl,
            DocumentUrl = uploadedDocumentUrl,
            Rg = request.ClientDetails!.Rg,
            Dob = request.ClientDetails!.Dob
        },
        CreatedBy = null,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    };

    public static LoginResponse MapLoginResponse(User user, string token) => new()
    {
        User = MapUserResponse(user),
        Token = token
    };

    public static RegisterResponse MapRegisterResponse(User user) => new()
    {
        Id = user.Id!,
        Name = user.Name,
        Email = user.Email,
        Type = user.Type,
    };

    public static RefreshResponse MapRefreshResponse(User user, string token) => new()
    {
        User = MapUserResponse(user),
        Token = token
    };
}