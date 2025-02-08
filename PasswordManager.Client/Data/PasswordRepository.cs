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
