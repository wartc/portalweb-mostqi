using MongoDB.Bson.Serialization.Conventions;

using PortalWeb.Data;
using PortalWeb.Repositories;
using PortalWeb.Services;
using PortalWeb.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// configuracao do mongodb
builder.Services.Configure<DBSettings>(builder.Configuration.GetSection("DatabaseSettings"));

// dependency injection do context do banco de dados para poder
// acessar collections diferentes a partir de uma mesma instancia do banco
builder.Services.AddSingleton<DatabaseContext>();

// adiciona cada repository com DI
builder.Services.AddSingleton<UserRepository>();

// adiciona cada service com DI 
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<RegisterService>();
builder.Services.AddScoped<AuthService>();

// controllers
builder.Services.AddControllers();

// convencao de camelCase para o mongo linkar automaticamente o nome das propriedades dos models
var camelCaseConventionPack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("CamelCase", camelCaseConventionPack, type => true);

var app = builder.Build();

// middleware para tratamento de erros
app.UseMiddleware<ErrorHandlingMiddleware>();
app.MapControllers();

app.Run();
