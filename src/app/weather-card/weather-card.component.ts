import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnChanges {
  selectedUnit: any = 'celsius';
  @Input() weatherData: any;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('weatherData changed:', this.weatherData);
  }
}
