import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
 
@Injectable()
export class ProListService {
 
    url: string
 
    constructor(private http : Http){
        this.url  = 'https://newhealthyfieapi.herokuapp.com/products';
    }
    fetch_products(){
        return this.http.get(this.url).map(res => {
            return res.json()
        })
    }
 
}