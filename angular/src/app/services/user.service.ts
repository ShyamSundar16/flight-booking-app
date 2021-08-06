import { Injectable } from "@angular/core";
import { User } from "../models/User";

@Injectable({"providedIn": "root"})
export class UserService{
    private u = new User();

    public set user(newU:User){
        this.u.valid = newU.valid; 
        this.u.name = newU.name; 
        this.u.email= newU.email;
        this.u.phone= newU.phone;

    }

    public get user(){
        return this.u;
    }
}