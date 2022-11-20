using System.Net;
using PortalWeb.Contracts.User;
using PortalWeb.Repositories;
using PortalWeb.Utils;

namespace PortalWeb.Services;

public class ClientService
{
    private readonly ClientRepository _clientRepository;

    public ClientService(ClientRepository clientRepository) => _clientRepository = clientRepository;

    public async Task<ServiceResponse<PaginatedUserResponse>> GetClientsAsync(int page, int size)
    {
        var clients = await _clientRepository.GetClientsAsync(page, size);

        if (clients == null)
        {
            return new ServiceResponse<PaginatedUserResponse>(false, message: "Não foi possível obter os clientes");
        }

        bool hasNextPage = false;

        if (clients.Count > size)
        {
            hasNextPage = true;
            clients.RemoveAt(clients.Count - 1);
        }

        var clientsResponse = Mapper.MapPaginatedUserResponse(clients, hasNextPage);

        return new ServiceResponse<PaginatedUserResponse>(true, clientsResponse, (int)HttpStatusCode.OK);
    }

    public async Task<ServiceResponse<PaginatedUserResponse>> GetClientsByNameAsync(string name, int page, int size)
    {
        var clients = await _clientRepository.GetClientsByNameAsync(name, page, size);

        if (clients == null)
        {
            return new ServiceResponse<PaginatedUserResponse>(false, message: "Não foi possível obter os clientes");
        }

        bool hasNextPage = false;

        if (clients.Count > size)
        {
            hasNextPage = true;
            clients.RemoveAt(clients.Count - 1);
        }

        var clientsResponse = Mapper.MapPaginatedUserResponse(clients, hasNextPage);

        return new ServiceResponse<PaginatedUserResponse>(true, clientsResponse, (int)HttpStatusCode.OK);
    }
}