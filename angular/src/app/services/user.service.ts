import { HttpClient } from "@angular/common/http/";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({"providedIn": "root"})
export class UserService{
    private u = new User();
    private url: string = "http://localhost:3000/users";


    constructor(private httpClient: HttpClient){

    }
    public set user(newU:User){
        this.u.id= newU.email;
        this.u.valid = newU.valid; 
        this.u.name = newU.name; 
        this.u.email= newU.email;
        this.u.phone= newU.phone;
        this.u.password= newU.password;

    }

    public get user(){
        return this.u;
    }

    getUserById(email: string){
        return this.httpClient.get<User>(this.url + "/" + email);
        
    }
    getAllUsers() {
        return this.httpClient.get(this.url);
    }

    saveUser(user: User) {
        return this.httpClient.post(this.url, user);
    }

    deleteUser(email: string) {
        return this.httpClient.delete(this.url + "/" + email);
    }

    updateUser(user: User) {
        return this.httpClient.put(this.url + "/" + user.email, user);
    }
}