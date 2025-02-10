using CommunityToolkit.Mvvm.Input;
using PasswordManager.Client.Data;
using System.Collections.ObjectModel;
using System.Linq;

namespace PasswordManager.Client.ViewModels;

public partial class PasswordTableViewModel : ViewModelBase
{
    private readonly IPasswordRepository _passwordRepository;

    public ObservableCollection<PasswordItemTableViewModel> Passwords { get; } = [];

    public PasswordTableViewModel(IPasswordRepository passwordRepository)
    {
        _passwordRepository = passwordRepository;
        Passwords =
        [
            .. _passwordRepository
                .GetPasswords()
                .Select(password => new PasswordItemTableViewModel(password))
        ];
    }

    private void GetPasswords()
    {
        Passwords.Clear();
        foreach (var password in _passwordRepository.GetPasswords())
        {
            Passwords.Add(new PasswordItemTableViewModel(password));
        }
    }

    [RelayCommand]
    private void AddPassword(PasswordModel password)
    {
        _passwordRepository.AddPassword(password);
        GetPasswords();
    }

    [RelayCommand]
    private void UpdatePassword(PasswordModel password)
    {
        _passwordRepository.UpdatePassword(password);
        GetPasswords();
    }

    [RelayCommand]
    private void DeletePassword(int id)
    {
        _passwordRepository.DeletePassword(id);
        GetPasswords();
    }
}

public partial class PasswordItemTableViewModel : ViewModelBase
{
    public PasswordModel? Password { get; }

    public string HiddenPassword { get; }

    public PasswordItemTableViewModel(PasswordModel? password)
    {
        Password = password;
        HiddenPassword = new('*', Password?.Password.Length ?? 0);
    }
}
