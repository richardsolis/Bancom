import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { CONST_PASSWORD, CONST_TIME_LOGIN, CONST_USUARIO } from '../shared/constants/gobal.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private sessionDurationMs: number = CONST_TIME_LOGIN;
  private sessionTimeoutTimer: any;

  constructor() {
    this.isLoggedInSubject.next(false);
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      setTimeout(() => {
        const isAuthenticated = username === CONST_USUARIO && password === CONST_PASSWORD;
        if (isAuthenticated) {
          this.startSessionTimer();
          this.isLoggedInSubject.next(true);
        }
        observer.next(isAuthenticated);
        observer.complete();
      }, 2000);
    });
  }

  logout(): void {
    this.stopSessionTimer();
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  private startSessionTimer(): void {
    this.sessionTimeoutTimer = timer(this.sessionDurationMs).subscribe(() => {
      this.logout();
    });
  }

  private stopSessionTimer(): void {
    if (this.sessionTimeoutTimer) {
      this.sessionTimeoutTimer.unsubscribe();
    }
  }
}
