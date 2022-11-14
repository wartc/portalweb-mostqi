using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace PortalWeb.Middlewares;

// Middleware geral para tratamento de erros, que nao sao tratados em outros lugares, para evitar que a API quebre
public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlingMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        Console.Error.WriteLine(exception);

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var result = JsonSerializer.Serialize(new ProblemDetails
        {
            Status = context.Response.StatusCode,
            Title = "Erro interno do servidor",
            Detail = exception.Message
        });

        return context.Response.WriteAsync(result);
    }
}