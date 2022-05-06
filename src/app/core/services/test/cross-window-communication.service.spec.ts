import {TestBed} from '@angular/core/testing';
import {CrossWindowCommunicationService} from '@app-core';

describe('CrossWindowCommunicationService', () => {
  let service: CrossWindowCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossWindowCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
