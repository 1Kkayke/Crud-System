import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipies, States } from '../../register/brasilapi.models';

@Injectable({
  providedIn: 'root'
})
export class ApiUfsService {

  BaseUrl: string = 'https://brasilapi.com.br/api'

  constructor(private http: HttpClient) { }
  
  listUFS():Observable<States[]>{
    const path ='/ibge/uf/v1' ;
    return this.http.get<States[]>(this.BaseUrl + path);
  }

  listMunicipies(uf: string):Observable<Municipies[]>{
    const path = `/ibge/municipios/v1/${uf}`;
    return this.http.get<Municipies[]>(this.BaseUrl + path);
  }
}
