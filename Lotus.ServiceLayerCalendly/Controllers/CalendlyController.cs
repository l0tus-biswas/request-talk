using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lotus.DataAccessLayerCalendly;
using Lotus.DataAccessLayerCalendly.Models;

namespace Lotus.ServiceLayerCalendly.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CalendlyController : Controller
    {
        CalendlyRepository repository;

        public CalendlyController()
        {
            repository = new CalendlyRepository();
        }

        [HttpGet]
        public JsonResult GetAllEvents(int userId, string usertoken)
        {
            List<Event> evt = new List<Event>();

            try
            {
                evt= repository.getAllEvent(userId, usertoken);
            }
            catch(Exception)
            {
                evt = null;
            }
            return Json(evt);
        }

        [HttpGet]
        public JsonResult GetEventById(int userId, string usertoken, int eventId)
        {
            List<Event> evt = new List<Event>();

            try
            {
                evt = repository.getEventById(userId, usertoken, eventId);
            }
            catch (Exception)
            {
                evt = null;
            }
            return Json(evt);
        }

        [HttpGet]
        public JsonResult GetAvailById(int userId, string usertoken, int availId)
        {
            List<Availability> avl = new List<Availability>();

            try
            {
                avl = repository.getAvailById(userId, usertoken, availId);
            }
            catch (Exception)
            {
                avl = null;
            }
            return Json(avl);
        }


        [HttpGet]
        public JsonResult GetAllBooking(string username)
        {
            List<Booking> avl = new List<Booking>();

            try
            {
                avl = repository.getAllBooking(username);
            }
            catch (Exception)
            {
                avl = null;
            }
            return Json(avl);
        }

        [HttpGet]
        public JsonResult PublicgetAvaibilityData(int userId, int avaibilityId)
        {
            List<Availability> avl = new List<Availability>();

            try
            {
                avl = repository.publicgetAvaibilityData(userId, avaibilityId);
            }
            catch (Exception)
            {
                avl = null;
            }

            return Json(avl);
        }
            [HttpGet]
            public JsonResult PublicgetUserData(string username)
            {
                List<User> usr = new List<User>();

                try
                {
                    usr = repository.publicgetUserData(username);
                }
                catch (Exception)
                {
                    usr = null;
                }
                return Json(usr);
            }

        [HttpGet]
        public JsonResult GetUserDataByEmail(string emailAdderss)
        {
            List<User> usr = new List<User>();

            try
            {
                usr = repository.getUserDataByEmail(emailAdderss);
            }
            catch (Exception)
            {
                usr = null;
            }
            return Json(usr);
        }

        [HttpGet]
            public JsonResult PublicgetEventData(int userId, string url)
            {
                List<Event> evt = new List<Event>();

                try
                {
                evt = repository.publicgetEventData(userId, url);
                }
                catch (Exception)
                {
                evt = null;
                }
                return Json(evt);
            }



        [HttpDelete]
        public bool DeleteEventById(int userId, string usertoken, int eventId)
        {
            bool status = false;

            try
            {

                status = repository.DeleteEvent(userId, usertoken, eventId);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpDelete]
        public bool DeleteScheduleById(int userId, string usertoken, int availId)
        {
            bool status = false;

            try
            {

                status = repository.DeleteScheduleById(userId, usertoken, availId);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }


        [HttpGet]
        public bool ValidateUser(string username, string password)
        {
            bool status = false;
            try
            {
                status = repository.ValidateUser(username, password);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }


        [HttpGet]
        public JsonResult GetUserData(int userId, string usertoken)
        {
            List<User> usr = new List<User>();

            try
            {
                usr = repository.getUserData(userId, usertoken);
            }
            catch (Exception)
            {
                usr = null;
            }
            return Json(usr);
        }

        [HttpGet]
        public JsonResult GetAllAvaibility(int userId, string usertoken)
        {
            List<Availability> avt = new List<Availability>();

            try
            {
                avt = repository.getAllAvailabilities(userId, usertoken);
            }
            catch (Exception)
            {
                avt = null;
            }
            return Json(avt);
        }

        [HttpPost]
        public bool RegisterUser(User user)
        {
            bool status = false;

            try
            {
                status = repository.RegisterUser(user.UserToken, user.FullName, user.Username, user.EmailAdderss, user.Password, user.Timezone);
            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }

        [HttpPut]
        public bool EditProfile(User user)
        {
            bool status = false;
            try
            {
                status = repository.editProfile(user.UserId, user.UserToken, user.Password, user.FullName, user.About, user.Timezone, user.Language);
            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }

        [HttpPost]
        public bool AddNewEvent(Event evt)
        {
            bool status = false;
            try
            {
                status = repository.addNewEvent(evt.UserId, evt.UserToken, evt.Title, evt.Url, evt.Length, evt.AvailabilityId, evt.Description, evt.Location);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut]
        public bool UpdateEventDetails(Event evt)
        {
            bool status = false;

            try
            {
                status = repository.updateEventDetails(evt.EventId, evt.UserId, evt.UserToken, evt.Title, evt.Description, evt.Location, 
               evt.Url, evt.Length, evt.AvailabilityId, evt.EventName, evt.OptInBooking, evt.DisableGuests,evt.HideEventType, (int)evt.TimeSlotIntervals);
            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }


        [HttpPost]
        public bool AddAvailablity(Availability avt)
        {
            bool status = false;
            try
            {
                   status = repository.addAvailablity(avt.AvailabilityName, avt.UserId, avt.UserToken, avt.Timezone);
            }
            catch (Exception)
            {
                status = false;
                
            }
            return status;


        }

        [HttpPut]
        public bool UpdateAvailablity(Availability avl)
        {
            bool status = false;

            try
            {
                    status = repository.updateAvailablity(avl.AvailabilityId, avl.AvailabilityName, avl.UserId, avl.UserToken, avl.Timezone, avl.WeeksAvailability);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPost]
        public bool AddNewBooking(Booking bk)
        {
            bool status = false;

            try
            {
                status = repository.addNewBooking(bk.BookedUser, bk.BookedEventId, bk.BookedEventName, bk.BookedTime,bk.AppointmentBookedUsername, bk.AppointmentBookedPhoneNumber, bk.AppointmentBookedEmail, bk.AppointmentGuestEmail, bk.AdditionalNotes,bk.SendConfirmationMail, bk.BookingStatus);
            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }

        [HttpPut]
        public bool ConfirmationMailMeeting(Booking bk)
        {
            bool status = false;
            try
            {

                status = repository.updateConfirmationMailOnSent(bk.BookedUser, bk.BookingId);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut]
        public bool BookingOnConfirm(Booking bk)
        {
            bool status = false;
            try
            {
               
                status = repository.updateBookingOnConfirm(bk.BookedUser,bk.BookingId);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut]
        public bool BookingOnReject(Booking bk)
        {
            bool status = false;
            try
            {

                status = repository.updateBookingOnReject(bk.BookedUser, bk.BookingId);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut]
        public bool BookingOnReschedule(Booking bk)
        {
            bool status = false;
            try
            {

                status = repository.updateBookingOnReschedule(bk.BookedUser, bk.BookingId);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut]
        public bool BookingOnComplete(Booking bk)
        {
            bool status = false;
            try
            {

                status = repository.updateBookingOnComplete(bk.BookedUser, bk.BookingId);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut]
        public bool BookingOnCancel(Booking bk)
        {
            bool status = false;
            try
            {

                status = repository.updateBookingOnCancel(bk.BookedUser, bk.BookingId);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }


    }
}
