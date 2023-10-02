import {Component, OnInit, ViewChild} from '@angular/core';
import {Participant} from "../../models/participant";
import {ParticipantService} from "../../shared/services/participant.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Center} from "../../models/center";
import {CenterService} from "../../shared/services/center.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit{

  centers:Center[]=[]

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'marathonCenterName', 'ranking', 'recordTime'];
  dataSource!: MatTableDataSource<Participant>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _participant:ParticipantService,
              private _centerService:CenterService) {

  }

  ngOnInit(): void {
    this.getAllCenters()
    this.getBestsParticipants()
  }

  getBestsParticipants() {
    this._participant.getAllParticipants().subscribe((data: any) => {
      if (data && data.length > 0) {
        const participantsByCenter: { [key: number]: Participant } = {};

        data.forEach((participant: Participant) => {
          if (!(participant.centerId in participantsByCenter) ||
            participant.ranking < participantsByCenter[participant.centerId].ranking) {
            participantsByCenter[participant.centerId] = participant;
          }
        });
        this.dataSource = new MatTableDataSource(Object.values(participantsByCenter));

        setTimeout(()=>{
          this.loadPaginator()
        },200)
      }
    });
  }

  getAllCenters(){
    this._centerService.getAllCenters().subscribe((data:any)=>{
      this.centers=data
    })
  }

  getNameCenterById(id: number){
    const center = this.centers.find((center: Center) => center.id == id);
    return center ? center.name : "";
  }

  loadPaginator() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
