import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface City {
    name: string;
    lat: number;
    lon: number;
}
export interface tempScale {
    name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    cities: City[] = [
        { name: 'Obregon', lat: 27.496031, lon: -109.932838 },
        { name: 'Hermosillo', lat: 29.072968, lon: -110.955917 },
        { name: 'Navojoa', lat: 27.082350, lon: -109.447533 },
        { name: 'Nogales', lat: 31.325680, lon: -110.945778 },
    ];
    scales: tempScale[] = [
        { name: 'Celcius' },
        { name: 'Fahrenheit' }
    ];

    selectedCity = this.cities[0];
    selectedScale = this.scales[0];

    public forecasts: WeatherForecast;
    public newData: WeatherForecast;

    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
        let headers = new HttpHeaders();
        headers = headers.append('lat', '' + this.selectedCity.lat);
        headers = headers.append('lon', '' + this.selectedCity.lon);
        headers = headers.append('scale', '' + this.selectedScale.name);
        let params = new HttpParams();
        params = params.append('lat', '' + this.selectedCity.lat);
        params = params.append('lon', '' + this.selectedCity.lon);
        params = params.append('scale', '' + this.selectedScale.name);

        http.get<WeatherForecast>(baseUrl + 'weatherapi', { headers, params })
            .subscribe(result => {
                this.forecasts = result;
            }, error => console.error(error));
    }

    cityChange() {
        let headers = new HttpHeaders();
        headers = headers.append('lat', ''+this.selectedCity.lat);
        headers = headers.append('lon', ''+this.selectedCity.lon);
        headers = headers.append('scale', ''+this.selectedScale.name);
        let params = new HttpParams();
        params = params.append('lat', '' + this.selectedCity.lat);
        params = params.append('lon', '' + this.selectedCity.lon);
        params = params.append('scale', '' + this.selectedScale.name);

        this.http.get<WeatherForecast>(
            this.baseUrl + 'weatherapi', {headers, params})
            .subscribe(result => {
            this.forecasts = result;
        }, error => console.error(error));
    }

    scaleChange() { 
        let headers = new HttpHeaders();
        headers = headers.append('lat', '' + this.selectedCity.lat);
        headers = headers.append('lon', '' + this.selectedCity.lon);
        headers = headers.append('scale', '' + this.selectedScale.name);
        let params = new HttpParams();
        params = params.append('lat', '' + this.selectedCity.lat);
        params = params.append('lon', '' + this.selectedCity.lon);
        params = params.append('scale', '' + this.selectedScale.name);

        this.http.get<WeatherForecast>(
            this.baseUrl + 'weatherapi', { headers, params })
            .subscribe(result => {
                this.forecasts = result;
            }, error => console.error(error));
    }
}

export interface WeatherForecast {
    data: Weather[];
}

export interface Weather {
    datetime: string;
    temp: number;
}
