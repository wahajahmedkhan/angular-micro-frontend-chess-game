import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {pathMaker, AuthService} from '@app-core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    _route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = pathMaker(segments as []);
    return this.authService.isUserLoggedIn.pipe(map(isUserLoggedIn => this.checkIfUserIsLoggedIn(isUserLoggedIn, url)));
  }

  private checkIfUserIsLoggedIn(isUserLoggedIn: boolean, url: string): boolean {
    if (isUserLoggedIn) {
      return true;
    }
    this.authService.redirectToUrl = url;
    this.router.navigate(['/auth']).then();
    return false;
  }
}
