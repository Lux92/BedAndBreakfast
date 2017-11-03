import { Component, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';


@Component({
    selector: 'guests',
    templateUrl: './guests.component.html',
    styleUrls: ['./guests.component.css']

})

export class GuestsComponent {
    public guests: Guest[];
    public selectedGuest: Guest| undefined;




    constructor(public http: Http, @Inject('BASE_URL') public baseUrl: string) {
        this.refreshData();
    }


    async refreshData() {
        this.http.get(this.baseUrl + 'api/guests').subscribe(result => {
            let guestList = [];

            for (let guest1 of result.json() as Guest[]) {

                let guest  = new Guest();
                guest.id = guest1.id;
                guest.name = guest1.name;
                guest.surname = guest1.surname;
                guest.fiscalCode = guest1.fiscalCode;
                guest.cellNumb = guest1.cellNumb;
                guest.gender = guest1.gender;
                guest.hasChanges = false;
                guestList.push(guest);
            }
            console.log("ok");

            this.guests = guestList;

            this.selectGuest();
        }, error => console.error(error));
    }


    selectGuest(): void {

        this.selectedGuest = undefined;

        for (let guest1 of this.guests) {
            if (guest1.deleted == false) {
                this.selectedGuest = guest1;
                break;
            }

        }
    }

    async putData(): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let serverCalls = [];

        for (let guest of this.guests) {
            if (guest.hasChanges == true || guest.deleted) {

                let json = JSON.stringify(guest.toJSON());

                if (!guest.id) { //create
                    if (!guest.deleted) {
                        let call = this.http.put(this.baseUrl + 'api/guests', json, { headers: headers });
                        serverCalls.push(call);
                    }
                }
                else {
                    if (guest.deleted) {
                        let url = this.baseUrl + 'api/guests?id=' + guest.id;
                        let call = this.http.delete(url, { headers: headers });
                        serverCalls.push(call);
                    }
                    else {
                        let call = this.http.post(this.baseUrl + 'api/guests', json, { headers: headers });
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



    onSelect(guest: Guest): void {

        if (guest.deleted == false) {
            this.selectedGuest = guest;
        }
    }

    addNewGuest(): void {
        this.selectedGuest = new Guest();
        this.selectedGuest.hasChanges = true;
        this.guests.push(this.selectedGuest);
    }

    async saveChanges(): Promise<void> {
        await this.putData();
        //console.log("update completed");
        //await this.refreshData();
    }

    delete(guest: Guest): void {
        guest.deleted = true;
        this.selectGuest();
    }
}
class Guest {
    id: number;

    private _name: string = "";
    private _surname: string = "";
    private _fiscalCode: string = "";
    private _cellNumb: string = "";
    private _gender: boolean = true;
    
    public hasChanges: boolean;
    public deleted: boolean = false;

    get name(): string {
        return this._name;
    }
    set name(n: string) {
        this._name = n;
        this.hasChanges = true;
        console.log("set name");
    }

    get surname(): string {
        return this._surname;
    }
    set surname(n: string) {
        this._surname = n;
        this.hasChanges = true;
        console.log("set surname");
    }

    get fiscalCode(): string {
        return this._fiscalCode;
    }
    set fiscalCode(n: string) {
        this._fiscalCode = n;
        this.hasChanges = true;
        console.log("set fiscalCode");
    }

    get cellNumb(): string {
        return this._cellNumb;
    }
    set cellNumb(n: string) {
        this._cellNumb = n;
        this.hasChanges = true;
        console.log("set cellNumb");
    }

    get gender(): boolean {
        return this._gender;
    }

    set gender(g: boolean) {
        this._gender = g;
        this.hasChanges = true;
        console.log("set gender");
    }

    public toJSON() {
        return {
            id: this.id,
            name: this._name,
            surname: this._surname,
            fiscalCode: this._fiscalCode,
            cellNumb: this._cellNumb,
            gender: this._gender,
        };
    };
}




