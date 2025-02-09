using System;
using CommunityToolkit.Mvvm.ComponentModel;
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

}
