using Lotus.DataAccessLayerCalendly.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Lotus.DataAccessLayerCalendly
{
    public class CalendlyRepository
    {
        CalendlyDBContext context;

        public CalendlyRepository()
        {
            context = new CalendlyDBContext();
        }
        
        public bool ValidateUser(string username, string password)
        {
            bool status = false;
            try
            {
                var user = context.User.First(u =>  u.EmailAdderss == username && u.Password == password);
                if (user != null)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public List<User> getUserData(int userId, string userToken)
        {
            List<User> lstUser = null;

            try
            {
                lstUser = context.User.Where(e => e.UserToken == userToken && e.UserId == userId).ToList();
            }
            catch (Exception)
            {
                lstUser = null;
            }
            return lstUser;
        }

        public List<User> publicgetUserData(string username)
        {
            List<User> lstUser = null;

            try
            {
                lstUser = context.User.Where(e => e.Username == username).ToList();
            }
            catch (Exception)
            {
                lstUser = null;
            }
            return lstUser;
        }

        public List<User> getUserDataByEmail(string emailAdderss)
        {
            List<User> lstUser = null;

            try
            {
                lstUser = context.User.Where(e => e.EmailAdderss == emailAdderss).ToList();
            }
            catch (Exception)
            {
                lstUser = null;
            }
            return lstUser;
        }

        public List<Event> publicgetEventData(int userId, string url)
        {
            List<Event> lstEvent = null;

            try
            {
                lstEvent = context.Event.Where(e => e.UserId == userId && e.Url == url).ToList();
            }
            catch (Exception)
            {
                lstEvent = null;
            }
            return lstEvent;
        }
        public List<Availability> publicgetAvaibilityData(int userId, int avaibilityId)
        {
            List<Availability> lstAvl = null;

            try
            {
                lstAvl = context.Availability.Where(a => a.UserId == userId && a.AvailabilityId == avaibilityId).ToList();
            }
            catch (Exception)
            {
                lstAvl = null;
            }
            return lstAvl;
        }


        public bool RegisterUser(string userToken, string fullName, string userName, string emailAddress, string password, string timezone)
        {
            bool status = false;

            try
            {
                User user = new User();
                user.UserToken = userToken;
                user.FullName = fullName;
                user.Username = userName;
                user.EmailAdderss = emailAddress;
                user.Password = password;

                context.User.Add(user);
                context.SaveChanges();

                User userData = null;
                userData = context.User.Where(u => u.UserToken == userToken && u.EmailAdderss == emailAddress).First();


                bool res = addAvailablity("Working Hours", userData.UserId, userData.UserToken, timezone);
                if (res == true)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }


            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }

        public bool editProfile(int userId, string userToken, string password, string fullName, string about, string timeZone, string language)
        {
            bool status = false;
            try
            {
                var user = context.User.First(u => u.UserId == userId && u.UserToken == userToken);

                if (user != null)
                {
                    user.Password = password;
                    user.FullName = fullName;
                    user.About = about;
                    user.Timezone = timeZone;
                    user.Language = language;

                    context.User.Update(user);
                    context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }
        public bool addNewEvent(int userId, string userToken, string title, string url, int length, int availabilityId, string description, string location)
        {
            bool status = false;
            try
            {
                Event evt = new Event();
                evt.UserId = userId;
                evt.UserToken = userToken;
                evt.Title = title;
                evt.Url = url;
                evt.Length = length;
                evt.AvailabilityId = availabilityId;
                evt.Description = description;
                evt.Location = location;

                context.Event.Add(evt);
                context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool updateEventDetails(int eventId, int userId, string userToken, string title, string description, string location,
            string url, int length, int availabiltyId, string eventName, string optInBooking, string disableGuest,string hideEventType, int timeSlotIntervals)
        {
            bool status = false;

            try
            {
                var evt = context.Event.First(e => e.EventId == eventId && e.UserId == userId && e.UserToken == userToken);
               
                if (evt != null)
                {
                    evt.Title = title;
                    evt.Description = description;
                    evt.Location = location;
                    evt.Url = url;
                    evt.Length = length;
                    evt.AvailabilityId = availabiltyId;
                    evt.EventName = eventName;
                    evt.OptInBooking = optInBooking;
                    evt.DisableGuests = disableGuest;
                    evt.HideEventType = hideEventType;
                    evt.TimeSlotIntervals = timeSlotIntervals;

                    context.Event.Update(evt);
                    context.SaveChanges();

                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }

        public List<Availability> getAllAvailabilities(int userId, string userToken)
        {
            List<Availability> lstavl = null;

            try
            {
                lstavl = context.Availability.Where(a => a.UserToken == userToken && a.UserId == userId).ToList();
            }
            catch (Exception)
            {
                lstavl = null;
            }
            return lstavl;
        }
      
        public bool addAvailablity(string availabiltyName, int userId, string userToken, string timezone)
        {
            bool status = false;
            string weeksAvailability = "[ { id: 1, aria_controls: 'panelsStayOpen-collapseOne', arial_abelledby: 'panelsStayOpen-headingOne', week_name: 'Monday', status: true, available_timings: [ { id: 1, start_time: '09:00 AM', end_time: '17:00 PM' } ] }, { id: 2, aria_controls: 'panelsStayOpen-collapseTwo', arial_abelledby: 'panelsStayOpen-headingTwo', week_name: 'Tuesday', status: true, available_timings: [ { id: 1, start_time: '09:00 AM', end_time: '17:00 PM' } ] }, { id: 3, aria_controls: 'panelsStayOpen-collapseThree', arial_abelledby: 'panelsStayOpen-headingThree', week_name: 'Wednesday', status: true, available_timings: [ { id: 1, start_time: '09:00 AM', end_time: '17:00 PM' } ] }, { id: 4, aria_controls: 'panelsStayOpen-collapseFour', arial_abelledby: 'panelsStayOpen-headingFour', week_name: 'Thursday', status: true, available_timings: [ { id: 1, start_time: '09:00 AM', end_time: '17:00 PM' } ] }, { id: 5, aria_controls: 'panelsStayOpen-collapseFive', arial_abelledby: 'panelsStayOpen-headingFive', week_name: 'Friday', status: true, available_timings: [ { id: 1, start_time: '09:00 AM', end_time: '17:00 PM' } ] }, { id: 6, aria_controls: 'panelsStayOpen-collapseSix', arial_abelledby: 'panelsStayOpen-headingSix', week_name: 'Saturday', status: true, available_timings: [ { id: 1, start_time: '09:00 AM', end_time: '17:00 PM' } ] }, { id: 7, aria_controls: 'panelsStayOpen-collapseSeven', arial_abelledby: 'panelsStayOpen-headingSeven', week_name: 'Sunday', status: false, available_timings: [ ] } ]";
             try
            {
              
                    Availability availability = new Availability();
                    availability.AvailabilityName = availabiltyName;
                    availability.UserId = userId;
                    availability.UserToken = userToken;
                     availability.Timezone = timezone;
                    availability.WeeksAvailability = weeksAvailability;

                    context.Availability.Add(availability);
                    context.SaveChanges();
                
                status = true;
            }
            catch(Exception ex)
            {
                status = false;
                Console.WriteLine(ex);
            }
            return status;

            
        }

        public bool updateAvailablity(int availabilityId, string availabiltyName, int userId, string userToken, string timezone, string weeksAvailability)
        {
           
            bool status = false;

            try
            {
                var availability = context.Availability.First(a => a.AvailabilityId == availabilityId && a.UserId == userId && a.UserToken == userToken);
                if (availability != null)
                {
                    availability.AvailabilityName = availabiltyName;
                    availability.Timezone = timezone;
                    availability.WeeksAvailability = weeksAvailability;

                    context.Availability.Update(availability);
                    context.SaveChanges(); 

                     status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public List<Event> getAllEvent(int userId, string userToken)
        {
            List<Event> lstEvent = null;

            try
            {
                lstEvent = context.Event.Where(e => e.UserToken == userToken && e.UserId == userId).ToList();
            }
            catch (Exception)
            {
                lstEvent = null;
            }
            return lstEvent;
        }

        public List<Event> getEventById(int userId, string userToken, int eventId)
        {
            List<Event> lstEvent = null;

            try
            {
                lstEvent = context.Event.Where(e => e.UserToken == userToken && e.UserId == userId && e.EventId == eventId).ToList();
            }
            catch (Exception)
            {
                lstEvent = null;
            }
            return lstEvent;
        }

        public List<Availability> getAvailById(int userId, string userToken, int availId)
        {
            List<Availability> lstAvl = null;

            try
            {
                lstAvl = context.Availability.Where(a => a.UserToken == userToken && a.UserId == userId && a.AvailabilityId == availId).ToList();
            }
            catch (Exception)
            {
                lstAvl = null;
            }
            return lstAvl;
        }

        public List<Booking> getAllBooking(string username)
        {
            List<Booking> bk = null;

            try
            {
                bk = context.Booking.Where(b => b.BookedUser == username ).ToList();
            }
            catch (Exception)
            {
                bk = null;
            }
            return bk;
        }

        public bool updateConfirmationMailOnSent(string username, int bookingId)
        {
            bool status = false;
            try
            {
                var bk = context.Booking.First(a => a.BookedUser == username && a.BookingId == bookingId);
                if (bk != null)
                {
                    bk.SendConfirmationMail = "Sent";
                    context.Booking.Update(bk);
                    context.SaveChanges();

                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;

        }
        public bool updateBookingOnConfirm(string username, int bookingId)
        {
            bool status = false;
            try
            {
                var bk = context.Booking.First(a => a.BookedUser == username && a.BookingId == bookingId);
                if (bk != null)
                {
                    bk.BookingStatus = "Confirmed";
                    context.Booking.Update(bk);
                    context.SaveChanges();

                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;

        }
           

        public bool updateBookingOnReject(string username, int bookingId)
        {

            bool status = false;

            try
            {

                var bk = context.Booking.First(a => a.BookedUser == username && a.BookingId == bookingId);

                if (bk != null)
                {
                    bk.BookingStatus = "Cancelled";
                    context.Booking.Update(bk);
                    context.SaveChanges();

                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool updateBookingOnReschedule(string username, int bookingId)
        {

            bool status = false;

            try
            {
                var bk = context.Booking.First(a => a.BookedUser == username && a.BookingId == bookingId);

                if (bk != null)
                {
                    bk.BookingStatus = "Rescheduled";
                    context.Booking.Update(bk);
                    context.SaveChanges();

                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool updateBookingOnComplete(string username, int bookingId)
        {

            bool status = false;

            try
            {
                var bk = context.Booking.First(a => a.BookedUser == username && a.BookingId == bookingId);

                if (bk != null)
                {
                    bk.BookingStatus = "Completed";
                    context.Booking.Update(bk);
                    context.SaveChanges();

                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool updateBookingOnCancel(string username, int bookingId)
        {

            bool status = false;

            try
            {
                var bk = context.Booking.First(a => a.BookedUser == username && a.BookingId == bookingId);

                if (bk != null)
                {
                    bk.BookingStatus = "Cancelled";
                    context.Booking.Update(bk);
                    context.SaveChanges();

                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }



        public bool DeleteEvent(int userId, string usertoken, int eventId)
        {
            Event evt = null;
            bool status = false;
            try
            {
                evt = context.Event.Find(eventId);
                if (evt != null)
                {
                    context.Event.Remove(evt);
                    context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool DeleteScheduleById(int userId, string usertoken, int availId)
        {
            Availability avl = null;
            bool status = false;
            try
            {
                avl = context.Availability.Find(availId);
                if (avl != null)
                {
                    context.Availability.Remove(avl);
                    context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool addNewBooking(string username, int eventId, string eventName, string bookedTime, string appointmentUsername, string appointmentUserPhoneNumber, string appointmentUserEmail, string appointmentGuestEmail, string additionalNotes, string sendConfirmationMail, string bookingstatus)
        {
            bool status = false;
            try
            {
                Booking bk = new Booking();
                bk.BookedUser = username;
                bk.BookedEventId = eventId;
                bk.BookedEventName = eventName;
                bk.BookedTime = bookedTime;
                bk.AppointmentBookedUsername = appointmentUsername;
                bk.AppointmentBookedPhoneNumber = appointmentUserPhoneNumber;
                bk.AppointmentBookedEmail = appointmentUserEmail;
                bk.AppointmentGuestEmail = appointmentGuestEmail;
                bk.AdditionalNotes = additionalNotes;
                bk.SendConfirmationMail = sendConfirmationMail;
                bk.BookingStatus = bookingstatus;
                context.Booking.Add(bk);
                context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }


    }
}
