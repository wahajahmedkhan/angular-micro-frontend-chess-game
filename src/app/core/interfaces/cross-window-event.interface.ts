import {WindowEventEnum} from '../constants/window-event.enum';

export interface CrossWindowEventInterface<T> {
  srcId: string;
  targetId: string;
  event: WindowEventEnum;
  data: T;
}
