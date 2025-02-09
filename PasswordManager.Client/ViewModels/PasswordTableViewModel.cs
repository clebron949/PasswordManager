using System;
using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.Input;
using PasswordManager.Client.Data;

namespace PasswordManager.Client.ViewModels;

public partial class PasswordTableViewModel : ViewModelBase
{
    private readonly IPasswordRepository _passwordRepository;

    public ObservableCollection<PasswordModel> Passwords { get; } = [];

    public PasswordTableViewModel()
    {
        _passwordRepository = MockData.GetMockPasswordRepository();
        Passwords = new ObservableCollection<PasswordModel>(_passwordRepository.GetPasswords());
    }

    private void GetPasswords()
    {
        Passwords.Clear();
        foreach (var password in _passwordRepository.GetPasswords())
        {
            Passwords.Add(password);
        }
    }

    [RelayCommand]
    private void AddPassword(PasswordModel password)
    {
        _passwordRepository.AddPassword(password);
        Passwords.Add(password);
    }

    [RelayCommand]
    private void UpdatePassword(PasswordModel password)
    {
        _passwordRepository.UpdatePassword(password);
        var index = Passwords.IndexOf(password);
        Passwords[index] = password;
    }

    [RelayCommand]
    private void DeletePassword(PasswordModel password)
    {
        _passwordRepository.DeletePassword(password.Id);
        Passwords.Remove(password);
    }
}
