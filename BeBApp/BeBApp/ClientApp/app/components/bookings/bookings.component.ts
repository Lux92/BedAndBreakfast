import { Component, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';


@Component({
    selector: 'bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.css']

})

export class BookingsComponent {
    public bookings: Booking[];
    public selectedBooking: Booking | undefined;




    constructor(public http: Http, @Inject('BASE_URL') public baseUrl: string) {
        this.refreshData();
    }


    async refreshData() {
        this.http.get(this.baseUrl + 'api/bookings').subscribe(result => {
            let bookingList = [];

            for (let book of result.json() as Booking[]) {

                let booking = new Booking();
                booking.id = book.id;
                booking.id_guest = book.id_guest;
                booking.id_room = book.id_room;
                booking.date = book.date;
                
                booking.hasChanges = false;
                bookingList.push(booking);
            }
            console.log("ok");

            this.bookings = bookingList;

            this.selectBooking();
        }, error => console.error(error));
    }


    selectBooking(): void {

        this.selectedBooking = undefined;

        for (let booking of this.bookings) {
            if (booking.deleted == false) {
                this.selectedBooking = booking;
                break;
            }

        }
    }

    async putData(): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let serverCalls = [];

        for (let booking of this.bookings) {
            if (booking.hasChanges == true || booking.deleted) {

                let json = JSON.stringify(booking.toJSON());

                if (!booking.id) { //create
                    if (!booking.deleted) {
                        let call = this.http.put(this.baseUrl + 'api/bookings', json, { headers: headers });
                        serverCalls.push(call);
                    }
                }
                else {
                    if (booking.deleted) {
                        let url = this.baseUrl + 'api/bookings?id=' + booking.id;
                        let call = this.http.delete(url, { headers: headers });
                        serverCalls.push(call);
                    }
                    else {
                        let call = this.http.post(this.baseUrl + 'api/bookings', json, { headers: headers });
                        serverCalls.push(call);
                    }

                }
            }
        }
        Observable.forkJoin(serverCalls)
            .subscribe(data => {
                this.refreshData();
            }, error => console.error(error));
    }



    onSelect(booking: Booking): void {

        if (booking.deleted == false) {
            this.selectedBooking = booking;
        }
    }

    addNewBooking(): void {
        this.selectedBooking = new Booking();
        this.selectedBooking.hasChanges = true;
        this.bookings.push(this.selectedBooking);
    }

    async saveChanges(): Promise<void> {
        await this.putData();
        //console.log("update completed");
        //await this.refreshData();
    }

    delete(booking: Booking): void {
        booking.deleted = true;
        this.selectBooking();
    }
}
class Booking {
    id: number;

    private _date: Date;
    private _id_room: number;
    private _id_guest: number;
   

    public hasChanges: boolean;
    public deleted: boolean = false;

    get date(): Date {
        return this._date;
    }
    set date(d:Date ) {
        this._date = d;
        this.hasChanges = true;
        console.log("set date");
    }

    get id_room(): number {
        return this._id_room;
    }
    set id_room(id: number) {
        this._id_room = id;
        this.hasChanges = true;
        console.log("set id_room");
    }

    get id_guest(): number {
        return this._id_guest;
    }
    set id_guest(id: number) {
        this._id_guest = id;
        this.hasChanges = true;
        console.log("set id_guest");
    }

    public toJSON() {
        return {
            id: this.id,
            date: this._date,
            id_guest: this._id_guest,
            id_room: this._id_room,
        };
    };
}




