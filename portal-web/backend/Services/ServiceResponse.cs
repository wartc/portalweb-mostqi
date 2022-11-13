namespace PortalWeb.Services;

// Classe para retornar uma resposta de serviço, com dados e status, para o controller fazer o tratamento de erros
public class ServiceResponse<TValue>
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public int? StatusCode { get; set; }
    public TValue? Data { get; set; }

    public ServiceResponse(bool success, int? statusCode = null, string? message = null)
    {
        Success = success;
        Message = message;
        StatusCode = statusCode;
    }

    public ServiceResponse(bool success, TValue data, int? statusCode = null, string? message = null)
    {
        Success = success;
        Message = message;
        StatusCode = statusCode;
        Data = data;
    }

}

public class ServiceResponse : ServiceResponse<object>
{
    public ServiceResponse(bool success, int? statusCode = null, string? message = null) : base(success, statusCode, message) { }

    public ServiceResponse(bool success, object data, int? statusCode = null, string? message = null) : base(success, data, statusCode, message) { }

}