export interface IBooking{
    bookingId: number,
    bookedUser: string,
    bookedEventId: number,
    bookedEventName: string,
    bookedTime: string,
    appointmentBookedUsername: string,
    appointmentBookedPhoneNumber: string,
    appointmentBookedEmail: string,
    appointmentGuestEmail: string,
    additionalNotes: string,
    sendConfirmationMail: string,
    bookingStatus:string
    
}