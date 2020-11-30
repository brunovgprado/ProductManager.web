import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Produto } from '../shared/models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  create(product: Produto){
    return this.http.post<string>(`${environment.baseUrl}produto`, product)
    .pipe(map(data => {
      if(data)
        return data;      
    }))
  }

  read(id: string){
    return this.http.get<Produto>(`${environment.baseUrl}produto?id=${id}`)
    .pipe(map(data => {
      if(data)
        return data;      
    }))
  }

  update(product: Produto){
    return this.http.put<any>(`${environment.baseUrl}produto`, product)
    .pipe(map(data => {
      if(data)
        return data;      
    }))
  }

  delete(id: string){
    return this.http.put<any>(`${environment.baseUrl}produto`, id)
    .pipe(map(data => {
      if(data)
        return data;      
    }))
  }
}
