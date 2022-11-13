using PortalWeb.Providers;
using PortalWeb.Services;
using PortalWeb.Models;
using MongoDB.Bson.Serialization.Conventions;

var builder = WebApplication.CreateBuilder(args);

// configure mongodb
builder.Services.Configure<DBSettings>(builder.Configuration.GetSection("DatabaseSettings"));

// add dependency injection of the mongodb database
// to access any collection from the singleton instance
builder.Services.AddSingleton<PortalWebCollectionProvider>();

// services
builder.Services.AddSingleton<UserService>();

// use controllers
builder.Services.AddControllers();

// use camelCase convention to automatically link mongodb bson element name in models
var camelCaseConventionPack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("CamelCase", camelCaseConventionPack, type => true);

var app = builder.Build();

app.MapControllers();
app.Run();
