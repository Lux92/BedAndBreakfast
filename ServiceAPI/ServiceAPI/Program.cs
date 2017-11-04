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

               
            }

            var host = new WebHostBuilder()
                .UseKestrel()
             .UseStartup<Startup>()
                .Build();

            Task restService = host.RunAsync();
            restService.Wait();

        }
    }
}
