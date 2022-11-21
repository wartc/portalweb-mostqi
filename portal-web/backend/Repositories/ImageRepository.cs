using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace PortalWeb.Repositories;

public class ImageRepository
{
    private readonly IConfiguration _configuration;

    private readonly Cloudinary _cloudinary;

    public ImageRepository(IConfiguration configuration)
    {
        _configuration = configuration;

        var account = new Account(
            _configuration["CloudinarySettings:CloudName"],
            _configuration["CloudinarySettings:ApiKey"],
            _configuration["CloudinarySettings:ApiSecret"]);

        _cloudinary = new Cloudinary(account);
    }

    public async Task<string> UploadImageAsync(string filename, string base64Image)
    {
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(filename, new MemoryStream(Convert.FromBase64String(base64Image))),
            PublicId = filename,
            Folder = _configuration["CloudinarySettings:Folder"],
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        return uploadResult.SecureUrl.AbsoluteUri;
    }

}