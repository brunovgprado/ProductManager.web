import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginSubject: BehaviorSubject<Login>;
  public authenticated: Observable<Login>;

  public nomeAplicativo = environment.nomeAplicativo;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.loginSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('authenticated')));
    this.authenticated = this.loginSubject.asObservable();
  }

  public get isAuthenticated(): Login {
    return this.loginSubject.value;
  }

  login(login: string, pass: string) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ${btoa(login+":"+pass)}`)
    }

    return this.http.post<Login>(`${environment.authProvider}login`,{},header)
    .pipe(map(data => {
      if(data.success){
        const usuarioEntityModel: Login = data;
        usuarioEntityModel.id = login;
  
        console.log('Authenticated: ', data);
        localStorage.setItem('authenticated', JSON.stringify(usuarioEntityModel));
        this.loginSubject.next(usuarioEntityModel);
        return data;
      }
      
      throw new Error("Authentication failed");
      
    }));
  }

  logout() {
    localStorage.removeItem('authenticated');
    this.loginSubject.next(null);
    this.router.navigate(['login']);
  }
}
