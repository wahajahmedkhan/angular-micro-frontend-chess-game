import {getTestBed, TestBed} from '@angular/core/testing';
import {AuthService, AuthGuard} from '@app-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let injector: TestBed;
  const routeMock: any = {snapshot: {}};
  const routeStateMock: any = [
    {parameters: {}, path: 'app'},
    {parameters: {}, path: 'dashboard'},
  ];
  const routerMock = {navigate: jest.fn().mockImplementation(() => Promise.resolve())};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, {provide: Router, useValue: routerMock}],
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    authService = injector.inject(AuthService);
    guard = injector.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    let res;
    (guard.canLoad(routeMock, routeStateMock) as Observable<boolean>).subscribe(value => (res = value));
    expect(res).toBeTruthy();
  });

  it('should let an Authenticated user navigate to the dashboard', () => {
    authService.logInUser();
    let res;
    (guard.canLoad(routeMock, routeStateMock) as Observable<boolean>).subscribe(value => (res = value));
    expect(res).toBeTruthy();
  });

  afterEach(() => {
    authService.logOutUser();
  });
});
