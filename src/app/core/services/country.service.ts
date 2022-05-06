import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {pathMaker} from '../helpers/path-maker';
import {Endpoints} from '../constants/endpoints.enum';
import {environment} from '../../../environments/environment';
import {CountryInterface} from '@app-core';

const server = environment.serverURL;
const api = Endpoints.api;

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  endPoints = {
    countries: pathMaker([server, api, Endpoints.countries]),
  };

  constructor(private _http: HttpClient) {}

  getCountries(): Observable<CountryInterface[]> {
    return this._http.get<CountryInterface[]>(this.endPoints.countries);
  }
}
