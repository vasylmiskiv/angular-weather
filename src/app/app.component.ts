import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { CitiesResponse } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private weatherServices: WeatherService) {}
  cities?: CitiesResponse;
  selectedCity: string = '';
  weatherData!: any;
  isLoading: boolean = false;
  units: string = 'M';

  ngOnInit(): void {
    this.getAllCities();
  }

  onSubmit() {
    this.isLoading = true;
    this.weatherServices
      .getWeaterByCity(this.selectedCity, this.units)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          this.isLoading = false;
        },
        error: (error) => {
          // toast
          this.isLoading = false;
        },
      });
  }

  private getAllCities() {
    this.isLoading = true;
    this.weatherServices.getAllCities().subscribe({
      next: (response) => {
        this.cities = response;
        this.isLoading = false;
      },
      error: (error) => {
        // обработка ошибки
        this.isLoading = false;
      },
    });
  }
}
