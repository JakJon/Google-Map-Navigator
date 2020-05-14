import { Component, ViewChild, OnInit, DoCheck } from "@angular/core";
import {} from "googlemaps";
import { LatLong } from './models/lat-long';

@Component({
  selector: "app-root",
  template: `
    <div class="main-container">
      <div #map style="width:100%;height:400px"></div>
      <div class="controls">
        <div class="compass">
          <p (click)="setDirection('W')" class="direction">W</p>
          <div class="center">
            <p (click)="setDirection('N')" class="direction">N</p>
            <input id="bearing">
            <p (click)="setDirection('S')" class="direction">S</p>
          </div>
          <p (click)="setDirection('E')" class="direction">E</p>
        </div>
        <div class="distance">
          <p>Distance to travel:</p>
          <input id="distance" type="number" placeholder="miles">
          <p class="message">{{message}}</p>
          <div class="search">
            <mat-icon color="primary">search</mat-icon>
            <p (click)="search()">SEARCH</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "map-explorer";

  @ViewChild("map", { static: true }) mapElement: any;
  public map: google.maps.Map;
  public defaultLocation: google.maps.LatLngLiteral = {lat: 42.9634, lng: -85.6681};
  public currentLocation: google.maps.LatLngLiteral;
  public searchDirection: string;
  public degreesToMiles : number = 0.014456716590528;
  public message: string;
  public searchDistance: number;

  constructor() {}

  //Initialize map with default settings
  ngOnInit(): void {
    const mapProperties = {
      center: this.defaultLocation,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );
  }

  search(){
    this.setDistance();
    if (this.validateInputs()){
      this.searchDistance = this.searchDistance * this.degreesToMiles;
      switch (this.searchDirection) {
        case "N":
          this.currentLocation = { lat: this.map.getCenter().lat() + this.searchDistance, lng: this.map.getCenter().lng()};
          this.map.setCenter(this.currentLocation);
          break;
        case "E":
          this.currentLocation = { lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() + this.searchDistance};
          this.map.setCenter(this.currentLocation);
          break;
        case "S":
          this.currentLocation = { lat: this.map.getCenter().lat() - this.searchDistance, lng: this.map.getCenter().lng()};
          this.map.setCenter(this.currentLocation);
          break;
        case "W":
          this.currentLocation = { lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() - this.searchDistance};
          this.map.setCenter(this.currentLocation);
          break;
      } 

      // let search : LatLong = {
      //   lat: this.map.getCenter
      // }
    }
  }

  setDirection(direction: string){
    this.searchDirection = direction;
    (<HTMLInputElement>document.getElementById("bearing")).value = direction;
  }

  setDistance(){
    if (+(<HTMLInputElement>document.getElementById("distance")).value) {
      this.searchDistance = +(<HTMLInputElement>document.getElementById("distance")).value;
    }
  }

  validateInputs(): boolean {
    if (this.searchDistance && this.searchDirection && this.searchDistance != 0){
      this.message = `Go ${this.searchDistance} miles ${this.searchDirection}`;
      return true;
    } else {
      this.message = "Enter valid input criteria";
      return false;
    }
  }

}
