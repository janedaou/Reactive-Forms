import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient, private permissionsService: NgxPermissionsService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(res => this.setSession(res))
      );
  }

  register(email: string, password: string, isAdmin: boolean): Observable<any> {
    const endpoint = isAdmin ? 'User/CreateAdminUser' : 'User/SignUp';
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, { email, password });
  }

  private setSession(authResult: any): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('role', authResult.role); // Assume the API returns a role field
    this.permissionsService.loadPermissions([authResult.role]);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.permissionsService.flushPermissions();
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public getRole(): string | null {
    return localStorage.getItem('role');
  }
}
