using System.Net;
using PortalWeb.Contracts.User;
using PortalWeb.Repositories;
using PortalWeb.Utils;

namespace PortalWeb.Services;

public class ClientService
{
    private readonly ClientRepository _clientRepository;

    public ClientService(ClientRepository clientRepository) => _clientRepository = clientRepository;

    public async Task<ServiceResponse<List<UserResponse>>> GetClientsAsync(int page, int size)
    {
        var clients = await _clientRepository.GetClientsAsync(page, size);

        if (clients == null)
        {
            return new ServiceResponse<List<UserResponse>>(false, message: "Não foi possível obter os clientes");
        }

        var clientsResponse = clients.Select(Mapper.MapUserResponse).ToList();

        return new ServiceResponse<List<UserResponse>>(true, clientsResponse, (int)HttpStatusCode.OK);
    }
}