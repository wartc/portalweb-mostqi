using System.Security.Cryptography;

namespace PortalWeb.Utils;

public static class Hasher
{
    private const int _saltSize = 16; // 128 bits
    private const int _keySize = 32; // 256 bits
    private const int _iterations = 100000;
    private static readonly HashAlgorithmName _algorithm = HashAlgorithmName.SHA256;

    private const char segmentDelimiter = ':';

    public static string Hash(string secret)
    {
        var salt = RandomNumberGenerator.GetBytes(_saltSize);
        var key = Rfc2898DeriveBytes.Pbkdf2(
            secret,
            salt,
            _iterations,
            _algorithm,
            _keySize
        );
        return string.Join(
            segmentDelimiter,
            Convert.ToHexString(key),
            Convert.ToHexString(salt),
            _iterations,
            _algorithm
        );
    }

    public static bool Verify(string secret, string hash)
    {
        var segments = hash.Split(segmentDelimiter);
        var key = Convert.FromHexString(segments[0]);
        var salt = Convert.FromHexString(segments[1]);
        var iterations = int.Parse(segments[2]);
        var algorithm = new HashAlgorithmName(segments[3]);
        var inputSecretKey = Rfc2898DeriveBytes.Pbkdf2(
            secret,
            salt,
            iterations,
            algorithm,
            key.Length
        );
        return key.SequenceEqual(inputSecretKey);
    }

    public static string GenerateRandomPassword()
    {
        Random random = new(); const string charset = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$&?";
        return new string(Enumerable.Repeat(charset, 12)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }
}
