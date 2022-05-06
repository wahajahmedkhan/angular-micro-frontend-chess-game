import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {UserRegisterInterface} from '@app-core';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnChanges {
  @Input() id: string;
  @Input() iframeRoute: SafeUrl;
  @Input() player: UserRegisterInterface;
  @Input() hasToPlay = true;
  @Input() resetCount = 0;
  @ViewChild('iFrameElement') iFrameElement: ElementRef<HTMLIFrameElement>;
  @Output() frameEmitter = new EventEmitter<Window | null>();
  totalMoves = 0;
  iframeLoading = true;
  private time = 0;
  timerDisplay = this.getDisplayTimer(this.time);
  private timerSubscription: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    if ('resetCount' in changes) {
      this.resetTimer();
    }
    const toPlay = changes['hasToPlay'];
    if (toPlay && !changes['resetCount']) {
      if (toPlay.firstChange) {
        return;
      } else {
        this.totalMoves = toPlay.currentValue ? this.totalMoves : this.totalMoves + 1;
      }
      this.setStorage();
    }
  }

  iframeLoaded() {
    this.iframeLoading = false;
    this.frameEmitter.emit(this.iFrameElement.nativeElement.contentWindow);
    const time = localStorage.getItem(this.id + '_time');
    const moves = localStorage.getItem(this.id + '_moveCount');
    this.time = Number(time ? time : 0);
    this.totalMoves = Number(moves ? moves : 0);
    this.timerDisplay = this.getDisplayTimer(this.time);
    this.startTimer();
  }

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      if (this.hasToPlay) {
        this.time++;
        this.timerDisplay = this.getDisplayTimer(this.time);
      }
    });
  }

  resetTimer() {
    this.time = 0;
    this.totalMoves = 0;
    this.timerDisplay = this.getDisplayTimer(this.time);
  }

  setStorage(): void {
    localStorage.setItem(this.id + '_time', String(this.time));
    localStorage.setItem(this.id + '_moveCount', String(this.totalMoves));
  }


  getDisplayTimer(time: number) {
    const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor((time % 3600) / 60);
    const seconds = '0' + Math.floor((time % 3600) % 60);
    return `${hours.slice(-2, -1)}${hours.slice(-1)}:${minutes.slice(-2, -1)}${minutes.slice(-1)}:${seconds.slice(
      -2,
      -1,
    )}${seconds.slice(-1)}`;
  }
}
