import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule import ediliyor

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,
    NgClass,
    // HttpClientModule buraya ekleniyor
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'] // styleUrls olmalı
})
export class WeatherComponent implements OnInit {
  weather: any;
  city: string = 'Istanbul';
  isDayTime: boolean = true;
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: WeatherService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      city: [this.city, Validators.required]
    });
    this.searchWeather();
  }

  searchWeather() {
    this.city = this.searchForm.get('city')?.value;
    if (this.city) {
      this.service.searchWeatherByCity(this.city).subscribe((res: any) => {
        console.log(res);
        this.weather = res;
        const localtime = this.weather.location.localtime;
        const hour = new Date(localtime).getHours();
        this.isDayTime = hour >= 6 && hour < 18;
      });
    }
  }
}
