import {Component, OnInit} from '@angular/core';
import {Participant} from "../../models/participant";
import {ParticipantService} from "../../shared/services/participant.service";
import {CenterService} from "../../shared/services/center.service";
import {Center} from "../../models/center";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit{

  bestParticipant!:Participant
  center!:Center
  constructor(private _participantService:ParticipantService,
              private _centerService:CenterService) {
  }

  ngOnInit(): void {
    this.getBestParticipant()
  }

  getBestParticipant() {
    this._participantService.getAllParticipants().subscribe((data: any) => {
      if (data && data.length > 0) {
        data = data.filter((participant:Participant) => participant.ranking === 1)
        this.bestParticipant = data[0]
        this.getCenter(this.bestParticipant.centerId)
        }
      });
  }

  getCenter(id:number){
    this._centerService.getCenterById(id).subscribe((data:any)=>{
      this.center = data
    })
  }


}
