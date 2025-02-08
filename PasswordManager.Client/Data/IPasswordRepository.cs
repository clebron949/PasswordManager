using System;
using System.Collections.Generic;

namespace PasswordManager.Client.Data;

public interface IPasswordRepository
{
    void AddPassword(PasswordModel password);
    void DeletePassword(int id);
    PasswordModel? GetPasswordById(int id);
    PasswordModel? GetPasswordByName(string name);
    List<PasswordModel> GetPasswords();
    void UpdatePassword(PasswordModel password);
}
