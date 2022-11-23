using System.Security.Claims;
using PortalWeb.Contracts.Account;
using PortalWeb.Repositories;
using PortalWeb.Utils;

namespace PortalWeb.Services;

public class AccountService
{
    private readonly UserRepository _userRepository;

    public AccountService(UserRepository userRepository) => _userRepository = userRepository;

    public async Task<ServiceResponse> ChangePasswordAsync(ChangePasswordRequest request, ClaimsPrincipal requestingUser)
    {
        var user = await new AuthorizationUtils(_userRepository).GetRequestingUser(requestingUser);

        if (user == null)
            return new ServiceResponse(false, 400, message: "Usuário não encontrado");

        if (!Hasher.Verify(request.CurrentPassword, user.Password))
            return new ServiceResponse(false, 400, message: "Senha atual incorreta");

        user.Password = Hasher.Hash(request.NewPassword);

        try { await _userRepository.UpdateAsync(user.Id!, user); }
        catch (Exception) { return new ServiceResponse(false, 500, message: "Erro ao alterar senha"); }

        return new ServiceResponse(true);
    }
}