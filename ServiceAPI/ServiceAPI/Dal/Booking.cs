using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceAPI.Dal
{
    public class Booking
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Id_guest { get; set; }
        public int Id_room { get; set; }
    }
}
