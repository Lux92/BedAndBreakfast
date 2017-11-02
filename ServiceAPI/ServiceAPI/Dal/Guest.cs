using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceAPI.Dal
{
    public class Guest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string FiscalCode { get; set; }
        public string CellNumb { get; set; }
        public bool Gender { get; set; }


    }
}
