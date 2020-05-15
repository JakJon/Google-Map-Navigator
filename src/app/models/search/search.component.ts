import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {} from "googlemaps";

@Component({
  selector: 'app-search',
  template: `
  <div class="container">
    <mat-card (click)="onClick()">
      <div class="section">
        <p>Search Position</p>
        <div>
        <h3>Lat: {{lat}}</h3>
        <h3>Long: {{lng}}</h3>
        </div>
      </div>
      <div class="section">
        <p>Direction:</p>
        <h3>{{bearing}}</h3>
      </div>
      <div class="section">
        <p>distance Traveled:</p>
        <h3>{{distance}} Miles</h3>
      </div>
      <mat-icon (click)="delete()">delete_outline</mat-icon>
    </mat-card>
  </div>
  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }
  @Input() id: number; 
  @Input() lat: number;
  @Input() lng: number; 
  @Input() bearing: string;
  @Input() distance: number; 
  @Output() submitLatLong = new EventEmitter<google.maps.LatLngLiteral>();
  @Output() deleteSearch = new EventEmitter<number>();

  ngOnInit(): void {
    this.distance = this.distance * 69;
    this.distance = Math.round(this.distance);
  }

  onClick() {
    console.log("hit");
    this.submitLatLong.emit({lat: this.lat, lng: this.lng});
  }

  delete() {
    this.deleteSearch.emit(this.id);
  }

}
