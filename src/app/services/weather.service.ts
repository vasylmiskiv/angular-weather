import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CitiesData,
  CitiesResponse,
  WeatherData,
  WeatherResponse,
} from '../models/weather.model';
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

    return this.http.post<CitiesResponse>(environment.citiesApiBaseUrl, data);
  }

  getWeaterByCity(
    selectedCity: string,
    units: string
  ): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      environment.weatherbitApiBaseUrl +
        `?city=${selectedCity}&country=UA&units=${units}&key=${environment.weatherbitAPIKey}`
    );
  }
}
