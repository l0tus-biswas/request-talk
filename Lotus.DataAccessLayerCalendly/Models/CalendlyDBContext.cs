using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Lotus.DataAccessLayerCalendly.Models
{
    public partial class CalendlyDBContext : DbContext
    {
        public CalendlyDBContext()
        {
        }

        public CalendlyDBContext(DbContextOptions<CalendlyDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Availability> Availability { get; set; }
        public virtual DbSet<Booking> Booking { get; set; }
        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CalendlyDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Availability>(entity =>
            {
                entity.Property(e => e.AvailabilityName)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Timezone)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.UserToken)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.WeeksAvailability)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Availability)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("availability_UserId_FK");
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.Property(e => e.AdditionalNotes).IsUnicode(false);

                entity.Property(e => e.AppointmentBookedEmail)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AppointmentBookedPhoneNumber)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.AppointmentBookedUsername)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.AppointmentGuestEmail)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BookedEventName)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.BookedTime)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.BookedUser)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.BookingStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SendConfirmationMail).IsUnicode(false);
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.Property(e => e.Description)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.DisableGuests)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('No')");

                entity.Property(e => e.EventName).IsUnicode(false);

                entity.Property(e => e.HideEventType)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('No')");

                entity.Property(e => e.Location)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Zoom')");

                entity.Property(e => e.OptInBooking)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('No')");

                entity.Property(e => e.TimeSlotIntervals).HasDefaultValueSql("((0))");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Url)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.UserToken)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Availability)
                    .WithMany(p => p.Event)
                    .HasForeignKey(d => d.AvailabilityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("availability_id_fk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Event)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("event_userid_fk");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.EmailAdderss)
                    .HasName("UQ__tmp_ms_x__53A50C9C80709C76")
                    .IsUnique();

                entity.HasIndex(e => e.UserToken)
                    .HasName("UQ__User__FD9E0823ECDBBE16")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("UQ__tmp_ms_x__536C85E4B7ABD656")
                    .IsUnique();

                entity.Property(e => e.About).IsUnicode(false);

                entity.Property(e => e.EmailAdderss)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Language)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProfilePicture).IsUnicode(false);

                entity.Property(e => e.Timezone).IsUnicode(false);

                entity.Property(e => e.UserToken)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
