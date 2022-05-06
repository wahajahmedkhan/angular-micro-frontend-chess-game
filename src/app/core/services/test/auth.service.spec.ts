import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService, UserRegisterInterfaceMock, UserSuccessfullyRegisteredMock} from '@app-core';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  const apiMocker = (method: string, url: string, expectedResponse: any, body?: any) => {
    const req = httpTestingController.expectOne({
      method: method,
      url,
    });
    req.flush(expectedResponse);
    return req;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sign up method should be called with with sign-up-interface', async () => {
    const method = jest.spyOn(service, 'registerUser');
    const res = await Promise.all([
      service.registerUser(UserRegisterInterfaceMock),
      apiMocker('POST', service.endPoints.register, UserSuccessfullyRegisteredMock),
    ]);
    expect(res[0]).toEqual(UserSuccessfullyRegisteredMock);
    expect(method).toBeCalledWith(UserRegisterInterfaceMock);
  });

  it('should add system user to the memory when set user is called', () => {
    service.setUser(UserSuccessfullyRegisteredMock);
    let user;
    service.user.subscribe(value => (user = value));
    expect(user).toEqual(UserSuccessfullyRegisteredMock);
  });

  it('should remove system user from the memory when remove user is called', () => {
    service.removeUser();
    let user;
    service.user.subscribe(value => (user = value));
    expect(user).toBeNull();
  });
});
