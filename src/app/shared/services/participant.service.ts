import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  baseUrl="http://localhost:3000/api/v1/participants"

  constructor(private _http:HttpClient) { }


  getAllParticipants(){
    return this._http.get(this.baseUrl)
  }

  getPaticipantById(id:number){
    return this._http.get(`${this.baseUrl}/${id}`)
  }


}
