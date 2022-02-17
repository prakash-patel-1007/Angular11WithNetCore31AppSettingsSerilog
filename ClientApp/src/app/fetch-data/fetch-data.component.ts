import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'security/forcast', {
      headers: this.getAuthorizationHeaders()
    }).subscribe(result => {
        this.forecasts = result;
    }, error => console.error(error));
  }

  private getAuthorizationHeaders() {
    const access_token = sessionStorage.getItem("access_token");
    return new HttpHeaders({
        Authorization: `Bearer ` + access_token
    });
}
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
