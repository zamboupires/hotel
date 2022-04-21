import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { IHotel } from "../models/hotel";

@Injectable({
  providedIn: 'root'
})

export class HotelListService{

    private readonly HOTEL_API_URL ='api/hotels';

  constructor( private http: HttpClient){

  }


    public getHotels(): Observable<IHotel[]> {
     return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
       tap( hotels=> console.log('hotels: ', hotels)),
       catchError(this.handleError)
     );
    }

    public getHotelById(id: number):Observable<IHotel | undefined>{
      const url = `${this.HOTEL_API_URL}/${id}`;

      if (id === 0) {
        return of(this.getDefaultHotel());
      }
      return this.http.get<IHotel>(url).pipe(
        catchError(this.handleError)
      );
    }

    public createhotel(hotel: IHotel): Observable<IHotel>{
      hotel = {
        ...hotel,
        imageUrl: 'assets/img/hotel-room.jpg',
        id: null!
      };
      return this.http.post<IHotel>(this.HOTEL_API_URL, hotel).pipe(
        catchError(this.handleError)
      );
    }

    public updateHotel(hotel: IHotel): Observable<IHotel> {
      const url= `${this.HOTEL_API_URL}/${hotel.id}`;

      return this.http.put<IHotel>(url, hotel).pipe(
        catchError(this.handleError)
      );
    }

    public deleteHotel(id: number): Observable<{}>{
      const url = `${this.HOTEL_API_URL}/${id}`;

      return this.http.delete<IHotel>(url).pipe(
      catchError(this.handleError)
        );
    }

    private getDefaultHotel(): IHotel{
      return{
        id: 0,
        hotelName: '',
        description: '',
        price: null!,
        rating: null!,
        imageUrl: ''
      };
    }

    private handleError(error: HttpErrorResponse) {
      let errorMessage: string;
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        errorMessage = `an error accurred: ${error.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
          errorMessage= `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`;
      }
      // return an observable with a user-facing error message
      return throwError(() => new Error(
        'Something bad happened; please try again later.' +
        '\n' + errorMessage));
    };
}
