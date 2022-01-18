namespace BMG_User_System
{
    public static class Data
    {
        private static List<User> Users = new List<User>()
        {
            new User() 
            {
                UserID = 1,
                Name = "James",
                Password = "J@mieCode",
                Status = "On Break",
                Updated = DateTime.Now,
            },
            new User()
            {
                UserID = 2,
                Name = "Matt",
                Password = "Ma77yL0gin",
                Status = "On Break",
                Updated = DateTime.Now,
            },
            new User()
            {
                UserID = 3,
                Name = "Samantha",
                Password = "Samanth@Enter",
                Status = "On Break",
                Updated = DateTime.Now,
            },
        };
        
        private static bool Updated = false;

        public static bool GetUpdated()
        {
            return Updated;
        }

        public static List<User> GetUsers ()
        {
            Updated = false;
            return Users;
        }

        public static int UpdateUser(int UserID, string Status)
        {
            User? user = Users.FirstOrDefault(x => x.UserID == UserID);
            if(user != null)
            {
                user.Status = Status;
                user.Updated = DateTime.Now;
                Updated = true;
                return 1;
            }
            return -1;
        }
    }
}
