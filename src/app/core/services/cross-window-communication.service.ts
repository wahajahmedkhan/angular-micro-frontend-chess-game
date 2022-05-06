import {Injectable} from '@angular/core';
import {CrossWindowEventInterface} from '../interfaces/cross-window-event.interface';
import {SafeResourceUrl} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class CrossWindowCommunicationService {
  constructor() {}

  postMessage(window: Window, data: CrossWindowEventInterface<any>, url?: string | SafeResourceUrl) {
    url ? window.postMessage(data, url as string) : window.postMessage(data);
  }
}
