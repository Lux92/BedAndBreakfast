import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    selector: 'bookings',
    templateUrl: './bookings.component.html'
})

export class BookingsComponent {
    public bookings: Booking[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/bookings').subscribe(result => {
            this.bookings = result.json() as Booking[];
        }, error => console.error(error));
    }
}

interface Booking {
    id: Int32Array;
    date: Date;
    id_guest: Int32Array;
    id_room: Int32Array;
}


