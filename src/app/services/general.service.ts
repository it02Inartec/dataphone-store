import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  configUrl = '/api';
  COUNTRY = '/country';
  STATES =  '/states';

  constructor(
    private http: HttpClient
  ) { }

  getCountry() {
    return this.http.get(this.configUrl + this.COUNTRY);
  }

  getCountryById(id) {
    return this.http.get(this.configUrl + this.COUNTRY + '/' + id);
  }

}
