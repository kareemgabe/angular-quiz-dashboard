import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api';
  private userCache = new Map<number, any>();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    this.loadingSubject.next(true);
    return this.http.get(`${this.apiUrl}/users?page=${page}`).pipe(
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getUserById(id: number): Observable<any> {
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id));
    } else {
      this.loadingSubject.next(true);
      return this.http.get(`${this.apiUrl}/users/${id}`).pipe(
        map(response => response['data']),
        shareReplay(1),
        map(user => {
          this.userCache.set(id, user);
          return user;
        }),
        finalize(() => this.loadingSubject.next(false))
      );
    }
  }
}
