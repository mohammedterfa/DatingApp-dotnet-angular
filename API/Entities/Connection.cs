namespace API.Entities;

public class Connection
{
    public Connection()
    {
        
    }
    
    public Connection(string connectionId, string username, string groupName)
    {
        ConnectionId = connectionId;
        Username = username;
        GroupName = groupName;
    }

    public string ConnectionId { get; set; }
    public string Username { get; set; }
    public string GroupName { get; set; }
}
