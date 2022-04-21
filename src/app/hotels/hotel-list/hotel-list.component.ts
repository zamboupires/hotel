import { Component, OnInit } from "@angular/core";
import {IHotel} from '../shared/models/hotel';
import { HotelListService } from "../shared/services/hotel-list.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit{
  public title= 'liste d\'hotels';

  public hotels: IHotel[]= [];



public showBadge: boolean = true;

private _hotelFilter= ' mot';

public filteredHotels: IHotel[]= [];
public receiveRating!: string;
public errMsg!: string;

constructor (private hotelListService: HotelListService){

}

ngOnInit(): void {
  this.hotelListService.getHotels().subscribe({
    next: hotels=> {
      this.hotels= hotels;
      this.filteredHotels= this.hotels;
    },
    error: err =>this.errMsg= err
  });

  this.hotelFilter='';
}

public toggleIsNewBadge(): void{
  this.showBadge= !this.showBadge;
}

 public get hotelFilter(): string {
  return this._hotelFilter;
 }

 public set hotelFilter(filter: string){
  this._hotelFilter= filter;
  this.filteredHotels= this.hotelFilter ? this.filterHotels(this.hotelFilter) : this.hotels;
 }

 public receiveRatingClicked(message: string): void{
  this.receiveRating = message;
 }

 private filterHotels(criteria: string): IHotel[]{
   criteria= criteria.toLocaleLowerCase();
   const res= this.hotels.filter(
     (hotel:IHotel) => hotel.hotelName.toLocaleLowerCase().indexOf(criteria) != -1
   );
   return res;
 }
}
