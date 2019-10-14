using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using angular.web.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace angular.web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherApiController : ControllerBase
    {
        private const string _URL = "https://api.weatherbit.io/v1.0/forecast/";
        private string _apiKey = "&key=940305adb61b436faa309d01520f791e";

        [HttpGet]
        public IEnumerable<Temperatures> Get(decimal lat, decimal lon, string scale)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(_URL);
                client.DefaultRequestHeaders.Accept
                    .Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var urlParameters = "daily?lat=" + lat + "&lon="+lon+"&days=15";
                // Call weather API weatherbit
                HttpResponseMessage response = client.GetAsync(urlParameters+_apiKey).Result;
                var resp = response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<Forecast>(resp.Result);

                foreach(var fc in data.data)
                {
                    if (scale == "Fahrenheit")
                    {
                        fc.temp = Math.Round((32 + (fc.temp / 0.5556)),2);
                    }
                }

                return data.data;
            }
        }
    }
}
