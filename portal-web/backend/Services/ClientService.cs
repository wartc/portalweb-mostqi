using System.Net;
using PortalWeb.Contracts;
using PortalWeb.Contracts.User;
using PortalWeb.Repositories;
using PortalWeb.Utils;

namespace PortalWeb.Services;

public class ClientService
{
    private readonly ClientRepository _clientRepository;

    public ClientService(ClientRepository clientRepository) => _clientRepository = clientRepository;

    public async Task<ServiceResponse<PaginatedResponse<UserResponse>>> GetClientsAsync(int page, int size)
    {
        var clients = await _clientRepository.GetClientsAsync(page, size);

        if (clients == null)
        {
            return new ServiceResponse<PaginatedResponse<UserResponse>>(false, message: "Não foi possível obter os clientes");
        }

        bool hasNextPage = false;

        if (clients.Count > size)
        {
            hasNextPage = true;
            clients.RemoveAt(clients.Count - 1);
        }

        var clientsResponse = Mapper.MapPaginatedUserResponse(clients, hasNextPage);

        return new ServiceResponse<PaginatedResponse<UserResponse>>(true, clientsResponse, (int)HttpStatusCode.OK);
    }

    public async Task<ServiceResponse<PaginatedResponse<UserResponse>>> SearchClientsByNameAsync(string name, bool searchByClient, int page, int size)
    {
        var clients = await _clientRepository.SearchClientsByNameAsync(name, searchByClient, page, size);

        if (clients == null)
        {
            return new ServiceResponse<PaginatedResponse<UserResponse>>(false, message: "Não foi possível obter os clientes");
        }

        bool hasNextPage = false;

        if (clients.Count > size)
        {
            hasNextPage = true;
            clients.RemoveAt(clients.Count - 1);
        }

        var clientsResponse = Mapper.MapPaginatedUserResponse(clients, hasNextPage);

        return new ServiceResponse<PaginatedResponse<UserResponse>>(true, clientsResponse, (int)HttpStatusCode.OK);
    }
}