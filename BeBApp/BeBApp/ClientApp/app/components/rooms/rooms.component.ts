import { Component, Inject } from '@angular/core';
import { Http,  RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';


@Component({
    selector: 'rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css']

})

export class RoomsComponent {
    public rooms: Room[];
    public selectedRoom: Room | undefined;




    constructor(public http: Http, @Inject('BASE_URL') public baseUrl: string) {
        this.refreshData();
    }


    async refreshData() {
        this.http.get(this.baseUrl + 'api/rooms').subscribe(result => {
            let roomList = [];

            for (let room1 of result.json() as Room[]) {

                let room = new Room();
                room.num = room1.num;
                room.name = room1.name;
                room.capacity = room1.capacity;
                room.price = room1.price;
                room.hasChanges = false;
                roomList.push(room);
            }
            console.log("ok");

            this.rooms = roomList;

            this.selectRoom();
        }, error => console.error(error));
    }


    selectRoom(): void {

        this.selectedRoom = undefined;

        for (let room1 of this.rooms) {
            if (room1.deleted == false) {
                this.selectedRoom = room1;
                break;
            }

        }
    }

    async putData(): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let serverCalls = [];

        for (let room of this.rooms) {
            if (room.hasChanges == true || room.deleted) {

                let json = JSON.stringify(room.toJSON());

                if (!room.num) { //create
                    if (!room.deleted) {
                        let call = this.http.put(this.baseUrl + 'api/rooms', json, { headers: headers });
                        serverCalls.push(call);
                    }
                }
                else {
                    if (room.deleted) {
                        let url = this.baseUrl + 'api/rooms?num=' + room.num;
                        let call = this.http.delete(url, { headers: headers });
                        serverCalls.push(call);
                    }
                    else {
                        let call = this.http.post(this.baseUrl + 'api/rooms', json, { headers: headers });
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
 


    onSelect(room: Room): void {

    if(room.deleted == false) {
        this.selectedRoom = room;
    }
}

    addNewRoom(): void {
    this.selectedRoom = new Room();
    this.selectedRoom.hasChanges = true;
    this.rooms.push(this.selectedRoom);
}

async saveChanges(): Promise < void> {
    await this.putData();
    //console.log("update completed");
    //await this.refreshData();
}

delete (room: Room): void {
    room.deleted = true;
    this.selectRoom();
}
}
class Room {
    num: number;

    private _name: string = "";
    private _capacity: number;
    private _price: number;
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

    get capacity(): number {
        return this._capacity;
    }
    set capacity(c: number) {
        this._capacity = c;
        this.hasChanges = true;
        console.log("set capacity");
    }

    get price(): number {
        return this._price;
    }

    set price(p: number) {
        this._price = p;
        this.hasChanges = true;
        console.log("set price");
    }

    public toJSON() {
        return {
            num: this.num,
            name: this._name,
            capacity: this._capacity,
            price: this._price
        };
    };
}




