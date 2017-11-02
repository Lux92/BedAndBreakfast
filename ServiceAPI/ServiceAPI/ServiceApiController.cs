using Microsoft.AspNetCore.Mvc;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using ServiceAPI.Dal;
using System.Threading.Tasks;
using System.Linq;

namespace ServiceAPI
{

    [Route("api")]
   public class ServiceApiController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        [HttpGet("setup")]
        public IActionResult SetupDatabase()
        {
            lock (setupLock)
            {
                using (var context = new BeBDbContext())
                {
                    // Create database
                    context.Database.EnsureCreated();
                }
                return Ok("database created");
            }
        }

        [HttpGet("rooms")]
        public async Task<IActionResult> GetRooms()
        {
            try
            {
                await parallelism.WaitAsync();

                using (var context = new BeBDbContext())
                {
                    return Ok(context.Rooms.ToList());
                }
            }
            finally
            {
                parallelism.Release();
            }
        }

        [HttpGet("room")]
        public async Task<IActionResult> GetRoom([FromQuery]int id)
        {
            using (var context = new BeBDbContext())
            {
                return Ok(await context.Rooms.FirstOrDefaultAsync(x => x.Num == id));
            }
        }

        [HttpPut("rooms")]
        public async Task<IActionResult> CreateRoom([FromBody]Room room)
        {
            using (var context = new BeBDbContext())
            {
                context.Rooms.Add(room);
                await context.SaveChangesAsync();

                return Ok();
            }
        }

        [HttpPost("rooms")]
        public async Task<IActionResult> UpdateRoom([FromBody]Room room)
        {
            using (var context = new BeBDbContext())
            {
                context.Rooms.Update(room);
                await context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpDelete("rooms")]
        public async Task<IActionResult> DeleteRoom([FromQuery]int id)
        {
            using (var context = new BeBDbContext())
            {
                var room = await context.Rooms.FirstOrDefaultAsync(x => x.Num == id);
                context.Rooms.Remove(room);
                await context.SaveChangesAsync();
                return Ok();


            }
        }

        [HttpGet("guests")]
        public async Task<IActionResult> GetGuests()
        {
            try
            {
                await parallelism.WaitAsync();

                using (var context = new BeBDbContext())
                {
                    return Ok(context.Guests.ToList());
                }
            }
            finally
            {
                parallelism.Release();
            }
        }

        [HttpGet("guest")]
        public async Task<IActionResult> GetGuest([FromQuery]int id)
        {
            using (var context = new BeBDbContext())
            {
                return Ok(await context.Guests.FirstOrDefaultAsync(x => x.Id == id));
            }
        }

        [HttpPut("guests")]
        public async Task<IActionResult> CreateGuest([FromBody]Guest guest)
        {
            using (var context = new BeBDbContext())
            {
                context.Guests.Add(guest);
                await context.SaveChangesAsync();

                return Ok();
            }
        }

        [HttpPost("guests")]
        public async Task<IActionResult> UpdateGuest([FromBody]Guest guest)
        {
            using (var context = new BeBDbContext())
            {
                context.Guests.Update(guest);
                await context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpDelete("guests")]
        public async Task<IActionResult> DeleteGuest([FromQuery]int id)
        {
            using (var context = new BeBDbContext())
            {
                var guest = await context.Guests.FirstOrDefaultAsync(x => x.Id == id);
                context.Guests.Remove(guest);
                await context.SaveChangesAsync();
                return Ok();


            }
        }


        [HttpGet("bookings")]
        public async Task<IActionResult> GetBookings()
        {
            try
            {
                await parallelism.WaitAsync();

                using (var context = new BeBDbContext())
                {
                    return Ok(context.Bookings.ToList());
                }
            }
            finally
            {
                parallelism.Release();
            }
        }

        [HttpGet("booking")]
        public async Task<IActionResult> GetBooking([FromQuery]int id)
        {
            using (var context = new BeBDbContext())
            {
                return Ok(await context.Bookings.FirstOrDefaultAsync(x => x.Id == id));
            }
        }

        [HttpPut("bookings")]
        public async Task<IActionResult> CreateBooking([FromBody]Booking booking)
        {
            using (var context = new BeBDbContext())
            {
                context.Bookings.Add(booking);
                await context.SaveChangesAsync();

                return Ok();
            }
        }

        [HttpPost("bookings")]
        public async Task<IActionResult> UpdateBooking([FromBody]Booking booking)
        {
            using (var context = new BeBDbContext())
            {
                context.Bookings.Update(booking);
                await context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpDelete("bookings")]
        public async Task<IActionResult> DeleteBooking([FromQuery]int id)
        {
            using (var context = new BeBDbContext())
            {
                var booking = await context.Bookings.FirstOrDefaultAsync(x => x.Id == id);
                context.Bookings.Remove(booking);
                await context.SaveChangesAsync();
                return Ok();


            }
        }

    }
}
