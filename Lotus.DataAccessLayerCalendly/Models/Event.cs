using System;
using System.Collections.Generic;

namespace Lotus.DataAccessLayerCalendly.Models
{
    public partial class Event
    {
        public int EventId { get; set; }
        public int UserId { get; set; }
        public string UserToken { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int Length { get; set; }
        public int AvailabilityId { get; set; }
        public string EventName { get; set; }
        public string Location { get; set; }
        public string OptInBooking { get; set; }
        public string DisableGuests { get; set; }
        public string HideEventType { get; set; }
        public int? TimeSlotIntervals { get; set; }

        public virtual Availability Availability { get; set; }
        public virtual User User { get; set; }
    }
}
