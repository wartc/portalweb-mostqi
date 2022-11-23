using MongoDB.Bson.Serialization.Conventions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using PortalWeb.Data;
using PortalWeb.Repositories;
using PortalWeb.Services;
using PortalWeb.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
    policy =>
    {
        policy.WithOrigins(builder.Configuration["Domains:Api"]!, builder.Configuration["Domains:Application"]!).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

// configuracao do mongodb
builder.Services.Configure<DBSettings>(builder.Configuration.GetSection("DatabaseSettings"));

// dependency injection do context do banco de dados para poder
// acessar collections diferentes a partir de uma mesma instancia do banco
builder.Services.AddSingleton<DatabaseContext>();

// adiciona cada repository com DI
builder.Services.AddSingleton<UserRepository>();
builder.Services.AddSingleton<ClientRepository>();
builder.Services.AddSingleton<ImageRepository>();
builder.Services.AddSingleton<CurrencyRepository>();

// adiciona cada service com DI 
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ClientService>();
builder.Services.AddScoped<RegisterService>();
builder.Services.AddScoped<AccountService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<CurrencyInformationService>();

// adiciona background service
builder.Services.AddHostedService<CurrencyBackgroundService>();

// controllers
builder.Services.AddControllers();

// convencao de camelCase para o mongo linkar automaticamente o nome das propriedades dos models
var camelCaseConventionPack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("CamelCase", camelCaseConventionPack, type => true);

// adiciona autenticacao
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

var app = builder.Build();

// middleware para tratamento de erros
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
