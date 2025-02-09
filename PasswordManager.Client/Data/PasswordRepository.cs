using System;
using System.Collections.Generic;
using System.Linq;

namespace PasswordManager.Client.Data;

public class PasswordRepository : IPasswordRepository
{
    private readonly List<PasswordModel> _passwords = [];

    public void AddPassword(PasswordModel password)
    {
        _passwords.Add(password);
    }

    public List<PasswordModel> GetPasswords()
    {
        return _passwords;
    }

    public PasswordModel? GetPasswordById(int id)
    {
        return _passwords.FirstOrDefault(p => p.Id == id);
    }

    public PasswordModel? GetPasswordByName(string name)
    {
        return _passwords.FirstOrDefault(p => p.Name == name);
    }

    public void UpdatePassword(PasswordModel password)
    {
        var index = _passwords.FindIndex(p => p.Id == password.Id);
        if (index != -1)
        {
            _passwords[index] = password;
        }
    }

    public void DeletePassword(int id)
    {
        _passwords.RemoveAll(p => p.Id == id);
    }
}

public static class MockData
{
    public static IPasswordRepository GetMockPasswordRepository()
    {
        var repository = new PasswordRepository();
        repository.AddPassword(
            new PasswordModel
            {
                Id = 1,
                Name = "Password 1",
                Username = "user1",
                Password = "password1",
                Url = "https://example.com",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            }
        );
        repository.AddPassword(
            new PasswordModel
            {
                Id = 2,
                Name = "Password 2",
                Username = "user2",
                Password = "password2",
                Url = "https://example.com",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            }
        );
        repository.AddPassword(
            new PasswordModel
            {
                Id = 3,
                Name = "Password 3",
                Username = "user3",
                Password = "password3",
                Url = "https://example.com",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            }
        );
        return repository;
    }
}
