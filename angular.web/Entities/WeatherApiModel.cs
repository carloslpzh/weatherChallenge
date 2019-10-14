using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.web.Entities
{
    public class Temperatures
    {
        public string datetime { get; set; }
        public double temp { get; set; }
    }

    public class Forecast
    {
        public List<Temperatures> data { get; set; }
        public string city_name { get; set; }
        public double lon { get; set; }
        public double lat { get; set; }
    }
}
