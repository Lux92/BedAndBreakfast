import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    selector: 'guests',
    templateUrl: './guests.component.html'
})

export class GuestsComponent {
    public guests: Guest[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/guests').subscribe(result => {
            this.guests = result.json() as Guest[];
        }, error => console.error(error));
    }
}

interface Guest {
    id: Int32Array;
    name: string;
    surname: string;
    fiscalCode: string;
    cellNumb: string;
    gender: boolean;
    
}


