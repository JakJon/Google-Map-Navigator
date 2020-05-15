using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapExplorerApi.Models
{
    public class LatLong
    {
        public long Id { get; set; }
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }
        public string Bearing { get; set; }
        public decimal Distance { get; set; }
    }
}
