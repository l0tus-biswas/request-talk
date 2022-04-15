using System;
using System.Collections.Generic;

namespace Lotus.DataAccessLayerCalendly.Models
{
    public partial class Booking
    {
        public int BookingId { get; set; }
        public string BookedUser { get; set; }
        public int BookedEventId { get; set; }
        public string BookedEventName { get; set; }
        public string BookedTime { get; set; }
        public string AppointmentBookedUsername { get; set; }
        public string AppointmentBookedPhoneNumber { get; set; }
        public string AppointmentBookedEmail { get; set; }
        public string AppointmentGuestEmail { get; set; }
        public string AdditionalNotes { get; set; }
        public string SendConfirmationMail { get; set; }
        public string BookingStatus { get; set; }
    }
}
