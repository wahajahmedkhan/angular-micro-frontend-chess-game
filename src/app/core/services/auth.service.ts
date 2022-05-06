import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, lastValueFrom, Observable} from 'rxjs';
import {Endpoints, pathMaker, UserRegisterInterface, UserSuccessfullyRegisterResponseInterface} from '@app-core';
import {environment} from '../../../environments/environment';

const server = environment.serverURL;
const api = Endpoints.api;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserLoggedInSubject = new BehaviorSubject(true);
  private systemUser = new BehaviorSubject<UserSuccessfullyRegisterResponseInterface | null>(null);
  redirectToUrl = '';
  endPoints = {
    register: pathMaker([server, api, Endpoints.employees]),
  };

  constructor(private http: HttpClient) {}

  registerUser(model: UserRegisterInterface): Promise<UserSuccessfullyRegisterResponseInterface> {
    return lastValueFrom(this.http.post<UserSuccessfullyRegisterResponseInterface>(this.endPoints.register, model));
  }

  get isUserLoggedIn(): Observable<boolean> {
    return this.isUserLoggedInSubject.asObservable();
  }

  logInUser(): void {
    this.isUserLoggedInSubject.next(true);
  }

  logOutUser(): void {
    this.isUserLoggedInSubject.next(false);
  }

  get user(): Observable<UserSuccessfullyRegisterResponseInterface | null> {
    return this.systemUser.asObservable();
  }

  setUser(value: UserSuccessfullyRegisterResponseInterface): void {
    this.systemUser.next(value);
  }

  removeUser(): void {
    this.systemUser.next(null);
  }
}
