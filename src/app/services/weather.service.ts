import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CitiesData } from '../models/weather.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getAllCities() {
    const data = {
      country: 'ukraine',
    };

    return this.http.post<CitiesData>(environment.citiesApiBaseUrl, data);
  }

  getWeaterByCity(selectedCity: string): Observable<any> {
    return this.http.get<any>(
      environment.weatherbitApiBaseUrl +
        `?city=${selectedCity}&country=UA&key=${environment.weatherbitAPIKey}`
    );
  }
}
