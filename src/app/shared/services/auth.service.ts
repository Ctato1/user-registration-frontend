import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  baseUrl:string = "http://localhost:5001";

  createUser(formData:any){
    return this.http.post(this.baseUrl+"/api/signup",formData)
  }
}
