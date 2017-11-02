using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ServiceAPI.Dal
{
  public  class Room
    {
        [Key]
        public int Num { get; set; }
        
        public string Name { get; set; }
        public int Capacity { get; set; }
        public float Price { get; set; }
    }
}
