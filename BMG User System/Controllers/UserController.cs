using Microsoft.AspNetCore.Mvc;

namespace BMG_User_System.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Data.GetUsers();
        }

        [HttpGet("{userid}")]
        public User GetUser(int UserID)
        {
            User? returnValue = Data.GetUsers().FirstOrDefault(x => x.UserID == UserID);
            if(returnValue != null)
            {
                return returnValue;
            }
            return new User { UserID = -1 };
        }

        [HttpPost("{userid}/{status}")]
        public int UpdateStatus(int UserID, string Status)
        {
            return Data.UpdateUser(UserID, Status);
        }

        [HttpGet("{name}/{password}")]
        public int AuthenticateUser(string Name, string Password)
        {
            User? AuthedUser = Data.GetUsers().FirstOrDefault(x => x.Name == Name && x.Password == Password);
            if(AuthedUser != null)
            {
                return AuthedUser.UserID;
            }
            return -1;
        }

        [HttpGet("ping")]
        public bool Ping()
        {
            return Data.GetUpdated();
        }
    }
}