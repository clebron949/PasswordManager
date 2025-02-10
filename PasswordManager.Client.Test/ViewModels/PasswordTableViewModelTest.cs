using PasswordManager.Client.Data;
using PasswordManager.Client.ViewModels;

namespace PasswordManager.Client.Test.ViewModels;

internal class PasswordTableViewModelTest
{
    private readonly PasswordModel _password = new()
    {
        Id = 4,
        Name = "Test",
        Username = "Test",
        Password = "Test",
        Url = "Test"
    };

    private PasswordTableViewModel _viewModel = null!;

    [SetUp]
    public void Setup()
    {
        var passwordRepository = MockData.GetMockPasswordRepository();
        _viewModel = new PasswordTableViewModel(passwordRepository);
    }

    [Test]
    public void ViewModelInstanceTest()
    {
        var viewModel = _viewModel;
        Assert.That(viewModel, Is.Not.Null);
    }

    [Test]
    public void PasswordsCollectionTest()
    {
        var viewModel = _viewModel;
        Assert.That(viewModel.Passwords, Is.Not.Null);
        Assert.That(viewModel.Passwords.Count, Is.GreaterThan(0));
    }

    [Test]
    public void AddPasswordTest()
    {
        var viewModel = _viewModel;
        var currentPasswords = viewModel.Passwords.ToList();
        viewModel.AddPasswordCommand.Execute(_password);
        Assert.That(viewModel.Passwords.Count, Is.EqualTo(currentPasswords.Count + 1));
        Assert.That(viewModel.Passwords.Last().Password, Is.EqualTo(_password));
    }

    [Test]
    [TestCase("Test2")]
    public void UpdatePasswordTest(string expectedPasswordName)
    {
        var viewModel = _viewModel;
        var currentPasswords = viewModel.Passwords.ToList();
        var password = currentPasswords.First();
        password.Password!.Name = expectedPasswordName;
        viewModel.UpdatePasswordCommand.Execute(password.Password);
        Assert.That(viewModel.Passwords.Count, Is.EqualTo(currentPasswords.Count));
        Assert.That(viewModel.Passwords.First().Password!.Name, Is.EqualTo(expectedPasswordName));
    }

    [Test]
    public void DeletePasswordTest()
    {
        var viewModel = _viewModel;
        var currentPasswords = viewModel.Passwords.ToList();
        var password = currentPasswords.First();
        viewModel.DeletePasswordCommand.Execute(password.Password!.Id);
        Assert.That(viewModel.Passwords.Count, Is.EqualTo(currentPasswords.Count - 1));
    }
}
