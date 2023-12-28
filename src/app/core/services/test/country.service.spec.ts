import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {countryMock, CountryService} from '@app-core';
import {lastValueFrom} from 'rxjs';

describe('CountryService', () => {
  let service: CountryService;
  let httpTestingController: HttpTestingController;
  const apiMocker = (method: string, url: string, expectedResponse: any) => {
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
    service = TestBed.inject(CountryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET method when getCountries() is called', async () => {
    const method = jest.spyOn(service, 'getCountries');
    const res = await Promise.all([
      lastValueFrom(service.getCountries()),
      apiMocker('GET', service.endPoints.countries, countryMock),
    ]);
    expect(res[0]).toEqual(countryMock);
    expect(method).toBeCalled();
  });
});
