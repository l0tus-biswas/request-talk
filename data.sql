CREATE DATABASE 'CalendlyDB';

CREATE TABLE [dbo].[User] (
    [UserId]         INT           IDENTITY (1, 1) NOT NULL,
    [UserToken]      VARCHAR (50)  NULL,
    [EmailAdderss]   VARCHAR (50)  NOT NULL,
    [Username]       VARCHAR (50)  NOT NULL,
    [Password]       VARCHAR (50)  NOT NULL,
    [FullName]       VARCHAR (50)  NOT NULL,
    [About]          VARCHAR (MAX) NULL,
    [ProfilePicture] VARCHAR (MAX) NULL,
    [Timezone]       VARCHAR (MAX) NULL,
    [Language]       VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([UserId] ASC),
    UNIQUE NONCLUSTERED ([UserToken] ASC),
    UNIQUE NONCLUSTERED ([Username] ASC),
    UNIQUE NONCLUSTERED ([EmailAdderss] ASC)
);

CREATE TABLE [dbo].[Event] (
    [EventId]           INT           IDENTITY (1, 1) NOT NULL,
    [UserId]            INT           NOT NULL,
    [UserToken]         VARCHAR (50)  NOT NULL,
    [Title]             VARCHAR (MAX) NOT NULL,
    [Url]               VARCHAR (MAX) NOT NULL,
    [Description]       VARCHAR (MAX) NOT NULL,
    [Length]            INT           NOT NULL,
    [AvailabilityId]    INT           NOT NULL,
    [EventName]         VARCHAR (MAX) NULL,
    [Location]          VARCHAR (50)  DEFAULT ('Zoom') NULL,
    [OptInBooking]      VARCHAR (50)  DEFAULT ('No') NULL,
    [DisableGuests]     VARCHAR (50)  DEFAULT ('No') NULL,
    [HideEventType]     VARCHAR (50)  DEFAULT ('No') NULL,
    [TimeSlotIntervals] INT           DEFAULT ((0)) NULL,
    PRIMARY KEY CLUSTERED ([EventId] ASC),
    CONSTRAINT [event_userid_fk] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([UserId]),
    CONSTRAINT [availability_id_fk] FOREIGN KEY ([AvailabilityId]) REFERENCES [dbo].[Availability] ([AvailabilityId])
);

CREATE TABLE [dbo].[Booking] (
    [BookingId]                    INT           IDENTITY (1, 1) NOT NULL,
    [BookedUser]                   VARCHAR (MAX) NOT NULL,
    [BookedEventId]                INT           NOT NULL,
    [BookedEventName]              VARCHAR (MAX) NOT NULL,
    [BookedTime]                   VARCHAR (MAX) NOT NULL,
    [AppointmentBookedUsername]    VARCHAR (MAX) NOT NULL,
    [AppointmentBookedPhoneNumber] CHAR (20)     NOT NULL,
    [AppointmentBookedEmail]       VARCHAR (50)  NOT NULL,
    [AppointmentGuestEmail]        VARCHAR (50)  NULL,
    [AdditionalNotes]              VARCHAR (MAX) NULL,
    [SendConfirmationMail]         VARCHAR (MAX) NULL,
    [BookingStatus]                VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([BookingId] ASC)
);

CREATE TABLE [dbo].[Availability] (
    [AvailabilityId]    INT           IDENTITY (1, 1) NOT NULL,
    [AvailabilityName]  VARCHAR (MAX) NOT NULL,
    [UserId]            INT           NOT NULL,
    [UserToken]         VARCHAR (50)  NOT NULL,
    [WeeksAvailability] VARCHAR (MAX) NOT NULL,
    [Timezone]          VARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_Availability] PRIMARY KEY CLUSTERED ([AvailabilityId] ASC),
    CONSTRAINT [availability_UserId_FK] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([UserId])
);


