import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  SelectedUnit,
  WeatherData,
  WeatherResponse,
} from '../models/weather.model';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnChanges {
  constructor(private weatherServices: WeatherService) {
    this.isLoading = false;
    this.selectedCity = '';
  }

  @Input() weatherData!: WeatherData;
  @Input() isLoading: boolean;
  @Input() selectedCity: string;

  selectedUnit: SelectedUnit = 'celsius';
  unitSymbol: string = 'C';

  handleChangeUnits(value: SelectedUnit): void {
    const unitAbbr = this.selectedUnit === 'celsius' ? 'M' : 'I';

    this.unitSymbol = value === 'celsius' ? 'C' : 'F';
    this.selectedUnit = value;
    this.getWeatherDataByUnits(unitAbbr);
  }

  getWeatherDataByUnits(unitAbbr: string) {
    this.showLoader();
    this.weatherServices
      .getWeaterByCity(this.selectedCity, unitAbbr)
      .subscribe({
        next: (response: WeatherResponse) => {
          this.weatherData.app_temp = response.data[0].app_temp;
          this.hideLoader();
        },
        error: (error) => {
          // need to add toast
          this.hideLoader();
        },
      });
  }

  ngOnChanges() {
    // this.showLoader();
  }

  private showLoader() {
    this.isLoading = true;
  }

  private hideLoader() {
    this.isLoading = false;
  }
}
