using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using PasswordManager.Client.Data;

namespace PasswordManager.Client.ViewModels;

public partial class PasswordModalViewModal : ViewModelBase
{
    private readonly IPasswordRepository _passwordRepository;

    [ObservableProperty]
    private PasswordModel _password = new();

    public PasswordModalViewModal(IPasswordRepository passwordRepository)
    {
        _passwordRepository = passwordRepository;
    }

    [RelayCommand]
    private void LoadPassword(PasswordModel password)
    {
        Password = password;
    }

    [RelayCommand]
    private void SavePassword()
    {
        if (Password.Id == 0)
        {
            _passwordRepository.AddPassword(Password);
        }
        else
        {
            _passwordRepository.UpdatePassword(Password);
        }
    }
}
