import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  baseUrl="http://localhost:3000/api/v1/centers"

  constructor(private _http:HttpClient) { }


  getAllCenters(){
    return this._http.get(this.baseUrl)
  }

  getCenterById(id:number){
    return this._http.get(`${this.baseUrl}/${id}`)
  }
}
