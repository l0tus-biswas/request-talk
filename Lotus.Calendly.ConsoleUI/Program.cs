
using Lotus.DataAccessLayerCalendly;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Lotus.Calendly.ConsoleUI
{
    class Program
    {
        static void Main(string[] args)
        {
            CalendlyRepository obj = new CalendlyRepository();
            //Console.WriteLine(obj.RegisterUser("ABCD123","Lotus Biswas","lotus-biswas", "lotushotmail111@gmail.com", "lotus123", "Asia/Calcutta"));
            //Console.WriteLine(obj.addAvailablity("Free Talk", 3014, "ABCD123")); ;
            //Console.WriteLine(obj.editProfile(3012,"ABCD123","lotus123", "Lotus Biswas", "aadad", "Australia/Darwin", "Hindi"));

            // Console.WriteLine(obj.addNewEvent(2012, "ABCD123","20 Mins Meeting","20-mins-meeting", 20, "Default Availability", "Talk About ML", "Zoom"));
            //Console.WriteLine(obj.getAllEvent(11,"ABCD123").Count);


            //Console.WriteLine(obj.getAllAvailabilities().Count);
            //Console.WriteLine(obj.updateEventDetails(8,3014, "ABCD123", "adadga", "FAFAFAFF", "Zoom",
            //"sfafa", 20, "ZmxqviaG7IAjt4P", "fdfhsf", "Yes","No", 30));

        }
    }
}
