import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/models';

const API_URL = 'http://localhost:8084/api/auth/';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient) {
        const userJson = localStorage.getItem('user');
        this.currentUserSubject = new BehaviorSubject<User | null>(userJson ? JSON.parse(userJson) : null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<User> {
        return this.http.post<User>(API_URL + 'signin', { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout(): void {
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(API_URL + 'signup', {
            username,
            email,
            password
        });
    }

    getAuthHeader(): HttpHeaders {
        const user = this.currentUserValue;
        if (user && user.token) {
            return new HttpHeaders({ 'Authorization': 'Bearer ' + user.token });
        }
        return new HttpHeaders();
    }
}
