import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { CitiesData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private weatherServices: WeatherService) {}
  cities?: CitiesData | null;
  selectedCity: string = '';
  weatherData: any;

  ngOnInit(): void {
    this.getAllCities();
  }

  onSubmit() {
    this.weatherServices.getWeaterByCity(this.selectedCity).subscribe({
      next: (response) => {
        this.weatherData = response;
      },
    });
  }

  private getAllCities() {
    this.weatherServices.getAllCities().subscribe({
      next: (response) => {
        this.cities = response;
      },
    });
  }
}
