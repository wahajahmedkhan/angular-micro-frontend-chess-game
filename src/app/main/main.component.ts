import {Component, ElementRef, HostListener, TemplateRef, ViewChild} from '@angular/core';
import {
  AuthService,
  CrossWindowCommunicationService,
  CrossWindowEventInterface,
  UserRegisterInterface,
  WindowEventEnum,
  WindowIdEnum,
} from '@app-core';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  window_id = WindowIdEnum;
  iFrame1: Window | null;
  iFrame2: Window | null;
  isFrame2HasToPlay = false;
  isMute = false;
  resetCounter = 0;
  winnerName: string | undefined;
  player1: UserRegisterInterface = {
    username: 'jhon_doe',
    country: {name: 'United Kingdom', code: 'GB'},
    full_name: 'Jhon Doe',
    email: 'jhon_doe@gmail.com',
  };
  player2: UserRegisterInterface = {
    username: 'David Blame',
    country: {name: 'United States', code: 'US'},
    full_name: 'David blame',
    email: 'david_blame@gmail.com',
  };
  iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.location.href + '/chess-board');
  registeredUser = this.authService.user;
  @ViewChild('audioOption') private audioPlayerRef: ElementRef;
  @ViewChild('gameOver') private gameOverDialog: TemplateRef<any>;
  @ViewChild('startDialog') private startDialog: TemplateRef<any>;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private crossWindowCom: CrossWindowCommunicationService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
  }

  set setFrame1(body: Window | null) {
    this.iFrame1 = body;
    this.setConfiguration(body, WindowIdEnum.frame_1, {
      isDark: false,
      id: WindowIdEnum.frame_1,
    });
    this.openDialog(true);
  }

  set setFrame2(body: Window | null) {
    this.iFrame2 = body;
    this.setConfiguration(body, WindowIdEnum.frame_2, {
      isDark: true,
      id: WindowIdEnum.frame_2,
    });
  }

  @HostListener('window:message', ['$event'])
  onMessage(e: {data: CrossWindowEventInterface<any>}): void {
    switch (e.data.event) {
      case WindowEventEnum.move:
        this.onAudioPlay();
        return this.move(e.data);
      case WindowEventEnum.checkMate:
        this.winnerName = e.data.srcId === WindowIdEnum.frame_2 ? this.player1.full_name : this.player2.full_name;
        this.openDialog(false);
        return;
      default:
        break;
    }
  }

  toggleSound(): void {
    this.isMute = !this.isMute;
  }

  logoutAndGoBack() {
    this.authService.logOutUser();
    this.authService.removeUser();
    this.router.navigate(['/auth']).then();
  }

  resetAll() {
    this.resetCounter++;
    this.isFrame2HasToPlay = false;
    localStorage.clear();
    this.resetOne(this.iFrame1, WindowIdEnum.frame_1);
    this.resetOne(this.iFrame2, WindowIdEnum.frame_2);
  }

  private onAudioPlay() {
    return this.isMute ? null : this.audioPlayerRef.nativeElement.play();
  }

  private openDialog(success: boolean) {
    const dialogRef = this.dialog.open(success ? this.startDialog : this.gameOverDialog);
    dialogRef.afterClosed().subscribe(() => {
      return success ? null : this.resetAll();
    });
  }

  private resetOne(body: Window | null, targetId: WindowIdEnum): void {
    if (body) {
      this.crossWindowCom.postMessage(
        body,
        {
          event: WindowEventEnum.reset,
          data: {},
          srcId: this.window_id.parent,
          targetId: targetId,
        },
        this.iframeUrl,
      );
    }
  }

  private setConfiguration(body: Window | null, targetId: WindowIdEnum, data: any): void {
    if (body) {
      this.crossWindowCom.postMessage(
        body,
        {
          event: WindowEventEnum.configuration,
          data: data,
          srcId: this.window_id.parent,
          targetId: targetId,
        },
        this.iframeUrl,
      );
    }
  }

  private move(body: CrossWindowEventInterface<any>) {
    const srcIsFrame1 = body.srcId === WindowIdEnum.frame_1;
    const win = srcIsFrame1 ? this.iFrame2 : this.iFrame1;
    this.isFrame2HasToPlay = !srcIsFrame1;
    body.targetId = srcIsFrame1 ? WindowIdEnum.frame_2 : WindowIdEnum.frame_1;
    if (win) {
      this.crossWindowCom.postMessage(win, body, this.iframeUrl);
    }
  }
}
