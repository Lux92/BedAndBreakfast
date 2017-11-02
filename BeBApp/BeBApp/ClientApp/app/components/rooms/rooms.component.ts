import { Component, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


@Component({
    selector: 'rooms',
    templateUrl: './rooms.component.html'
     
})

export class RoomsComponent {
    public rooms: Room[];
    options: RequestOptions;
    headers: Headers;

    

    constructor(public http: Http, @Inject('BASE_URL') public baseUrl: string) {
        http.get(baseUrl + 'api/rooms').subscribe(result => {
            this.rooms = result.json() as Room[];
        }, error => console.error(error));
        this.options = new RequestOptions({ headers: this.headers });
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
    }

    public put(room: Room) {
    
       let headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let body = JSON.stringify(room);
        this.http.put(this.baseUrl + 'api/rooms', body, this.options).subscribe();

    }
    
 
}



interface Room {
    num: number;
    name: string;
    capacity: number;
    price: number;
}


