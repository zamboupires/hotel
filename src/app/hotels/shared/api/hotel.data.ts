import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IHotel } from '../models/hotel';

export class hotelDATA implements InMemoryDbService {

    createDb(): Record<string, IHotel[]>{

      const hotels: IHotel[]= [
        {
          id: 1,
          hotelName: "Buea sweet life",
          description: "belle vue au bord de la mer",
          price: 150.50,
          imageUrl: "assets/img/hotel-room.jpg",
          rating: 4,
          tags:['nouveau']
        },
        {
          id: 2,
          hotelName: "Buea mountain hotel",
          description: "waouhh montagne montagne ...",
          price: 135.50,
          imageUrl: "assets/img/indoors.jpg",
          rating: 3.5,
          tags:['nouveau']
        },
        {
          id: 3,
          hotelName: "Akwa palace",
          description: "profitez d'une belle vue au coeur e douala",
          price: 120.50,
          imageUrl: "assets/img/the-interior.jpg",
          rating: 5,
          tags:['nouveau']
        },
        {
          id: 4,
          hotelName: "Hilton hotel",
          description: "reference des hotels de yaounde",
          price: 145.250,
          imageUrl: "assets/img/window.jpg",
          rating:2,
          tags:['nouveau']
        }
      ];
      return { hotels };
    }

    genId(hotels: IHotel[]): number{
      return hotels.length > 0? Math.max(...hotels.map(hotel => hotel.id)) +1 : 1;
    }
}
