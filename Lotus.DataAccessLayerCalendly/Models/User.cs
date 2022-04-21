using System;
using System.Collections.Generic;

namespace Lotus.DataAccessLayerCalendly.Models
{
    public partial class User
    {
        public User()
        {
            Availability = new HashSet<Availability>();
            Event = new HashSet<Event>();
        }

        public int UserId { get; set; }
        public string UserToken { get; set; }
        public string EmailAdderss { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }
        public string FullName { get; set; }
        public string About { get; set; }
        public string ProfilePicture { get; set; }
        public string Timezone { get; set; }
        public string Language { get; set; }

        public virtual ICollection<Availability> Availability { get; set; }
        public virtual ICollection<Event> Event { get; set; }
    }
}
