using System;
using System.Collections.Generic;

namespace Lotus.DataAccessLayerCalendly.Models
{
    public partial class Availability
    {
        public Availability()
        {
            Event = new HashSet<Event>();
        }

        public int AvailabilityId { get; set; }
        public string AvailabilityName { get; set; }
        public int UserId { get; set; }
        public string UserToken { get; set; }
        public string WeeksAvailability { get; set; }
        public string Timezone { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Event> Event { get; set; }
    }
}
