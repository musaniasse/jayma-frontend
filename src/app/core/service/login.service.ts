import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';
import {map, Observable, tap} from 'rxjs';

export interface ICredentials {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8082';
  $user = signal<User | null | undefined>(undefined);

  constructor() { }

  login(credentials: ICredentials): Observable<User | null | undefined> {
    return this.http.post(this.BASE_URL + '/auth/login', credentials).pipe(
      tap((res :any)=> {
        localStorage.setItem('token', res['token']);
        const user = Object.assign(new User(), res['user']);
        this.$user.set(user);
        if(this.$user())
          localStorage.setItem('user', JSON.stringify(this.$user()));

      }),
      map((res :any)=> {
        return this.$user();
      })
    )
  }

  getUser(): Observable<User | null | undefined> {
    return this.http.get(this.BASE_URL + '/auth/me').pipe(
      tap((res: any)=> {
        const user = Object.assign(new User(), res['user']);
        this.$user.set(user);
      }),
      map((res: any) => {
        return this.$user();
      })
    )
  }

  logout(): Observable<null> {
    return this.http.get(this.BASE_URL + '/auth/logout')
      .pipe(
        tap((res: any)=> {
          localStorage.removeItem('token');
          this.$user.set(null);
        })
      );
  }
}
