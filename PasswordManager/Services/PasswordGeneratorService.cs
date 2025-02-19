using System;

namespace PasswordManager.Services;

public struct PasswordConstants
{
    public const string UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    public const string LowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    public const string Numbers = "0123456789";
    public const string SpecialCharacters = "!@#$%^&*()_+-=[]{}?";
}

public class PasswordGeneratorOptions
{
    public int Length { get; set; } = 12;
    public bool IncludeUppercase { get; set; } = true;
    public bool IncludeLowercase { get; set; } = true;
    public bool IncludeNumbers { get; set; } = true;
    public bool IncludeSpecialCharacters { get; set; } = true;
}

public class PasswordGeneratorService
{
    public static string Generate(PasswordGeneratorOptions options)
    {
        var characters = new List<char>();
        if (options.IncludeUppercase)
        {
            characters.AddRange(PasswordConstants.UppercaseLetters);
        }
        if (options.IncludeLowercase)
        {
            characters.AddRange(PasswordConstants.LowercaseLetters);
        }
        if (options.IncludeNumbers)
        {
            characters.AddRange(PasswordConstants.Numbers);
        }
        if (options.IncludeSpecialCharacters)
        {
            characters.AddRange(PasswordConstants.SpecialCharacters);
        }
        var random = new Random();
        var password = new char[options.Length];
        for (int i = 0; i < options.Length; i++)
        {
            password[i] = characters[random.Next(characters.Count)];
        }
        return new string(password);
    }
}
