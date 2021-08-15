import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http/";
import { Token } from "../models/Token";

@Injectable()
export class TokenService {
  
    private t = new Token();

    public set token(newT: Token) {
        this.t.sub = newT.sub;
        this.t.role = newT.role;
        this.t.exp = newT.exp;
        this.t.iat = newT.iat;
    }

    public get token() {
        return this.t;
    }
    constructor(private httpClient: HttpClient) {
    }
}