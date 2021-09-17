import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PriceapiService {

  constructor(private http: HttpClient) { }
  configUrl = 'https://api.pancakeswap.info/api/v2/tokens/0xEDE5020492Be8E265dB6141CB0a1D2dF9dBAE9BB';

  getDoughPrice() {
    return this.http.get<any>(this.configUrl);
  }
  getCakePrice() {
    return this.http.get<any>('https://api.pancakeswap.info/api/v2/tokens/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82');
  }
}
