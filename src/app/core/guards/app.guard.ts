import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isUserLoggedIn.pipe(map(isUserLoggedIn => this.checkIfUserLoggedIn(isUserLoggedIn)));
  }

  private checkIfUserLoggedIn(isUserLoggedIn: boolean): boolean {
    if (!isUserLoggedIn) {
      return true;
    }
    if (this.router.url === '/') {
      this.router.navigate(['/app']).then();
    }
    return false;
  }
}
