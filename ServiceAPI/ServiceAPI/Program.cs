using Microsoft.AspNetCore.Hosting;
using ServiceAPI.Dal;
using System;
using System.Threading.Tasks;

namespace ServiceAPI
{
    class Program
    {
        static void Main(string[] args)
        {

            using (var context = new BeBDbContext())
            {
                // Create database
                context.Database.EnsureCreated();

                Room room = new Room()
                {
                    Num = 1,
                    Capacity = 3,
                    Name = "Yellow Room",
                    Price = 130
                };

                context.Rooms.Add(room);
      

                Guest guest = new Guest()
                {
                    Id = 1,
                    Name = "Ayeye",
                    Surname = "Brazorf",
                    FiscalCode = "AJJBRZF223XVWF",
                    Gender = true,
                    CellNumb = "346 99 456 34"
                };

                context.Guests.Add(guest);
             

                Booking booking = new Booking()
                {
                    Id = 1,
                    Id_guest = 1,
                    Date = DateTime.Now,
                    Id_room = 1
                };
                context.Bookings.Add(booking);
              //  context.SaveChanges();
            }

            var host = new WebHostBuilder()
                .UseKestrel()
             .UseStartup<Startup>()
                .Build();

            Task restService = host.RunAsync();

            // System.Diagnostics.Process.Start("chrome.exe", "http://localhost/netcoreapp2.0/corsoing/");
            System.Diagnostics.Process.Start("cmd", "/C start http://localhost/netcoreapp2.0/corsoing/");
            restService.Wait();

        }
    }
}
