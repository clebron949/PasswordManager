using Dapper;
using MySqlConnector;

namespace PasswordManager.PasswordStore;

public class PasswordStoreRepository(string connectionString)
{

    public async Task<IEnumerable<PasswordStoreModel>> GetAll()
    {
        await using var connection = new MySqlConnection(connectionString); 
        var results = await connection.QueryAsync<PasswordStoreModel>("SELECT * FROM passwordStore");
        return results ?? [];
    }

    public async Task<PasswordStoreModel?> Get(int id)
    {
        await using var connection = new MySqlConnection(connectionString);
        var result = connection.QueryFirst<PasswordStoreModel>(@"SELECT * FROM passwordStore WHERE Id = @id", new { Id = id });
        return result;
    }
    
    public async Task<int> Add(PasswordStoreModel model)
    {
        await using var connection = new MySqlConnection(connectionString);
        var result = await connection.ExecuteAsync(@"INSERT INTO passwordStore (Name, Username, Password) VALUES (@Name, @Username, @Password)", model);
        return result;
    }
    
    public async Task<int> Update(PasswordStoreModel model)
    {
        await using var connection = new MySqlConnection(connectionString);
        var result = await connection.ExecuteAsync(@"UPDATE passwordStore SET Name = @Name, Username = @Username, Password = @Password WHERE Id = @Id", model);
        return result;
    }
    
    public async Task Delete(int id)
    {
        await using var connection = new MySqlConnection(connectionString);
        await connection.ExecuteAsync(@"DELETE FROM passwordStore WHERE Id = @Id", new { Id = id });
    }
    
}

public class PasswordStoreModel
{
    public int Id { get; init; }
    public string Name { get; set; } = "";
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public DateTime CreatedDate { get; init; }
}