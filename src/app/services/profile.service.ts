import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders, HttpParams} from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Profile } from '../models/profile.model'; 
import { NgForm } from "@angular/forms";

@Injectable({
    providedIn: "root"
}) 

export class ProfileService {
    renderComponent: String = "";
    
    constructor(private http:HttpClient) {
        
    }
    
    getProfile(){
        //make API call, then call toPromise
        // calling the api and then letting X know that im done and heres the information
        return this.http.get("https://critika-backend.herokuapp.comuser/account").toPromise()
        
    }
    
    editProfile(homepage:string, loc: string, occupation: string, aboutme: string){
        const profile:Object = {
            location: loc,
            homepage: homepage,
            occupation: occupation,
            aboutme: aboutme
        }
        
        return this.http.post("https://critika-backend.herokuapp.comuser/profile", profile)
    }
    
    getAllUsers(){
        return this.http.get("https://critika-backend.herokuapp.comuser/all-users").toPromise();
    }

    getUser(user:string){
        const param:Object = {
            username: user
        }
        return this.http.post("https://critika-backend.herokuapp.comuser/find", param);
    }
    banUser(user: string) {

        const param:Object = {
            usernameToBeBanned: user
        }
        return this.http.post("https://critika-backend.herokuapp.comuser/ban-user", param);
    }

    restoreUser(user: string) {

        const param:Object = {
            usernameToBeRestored: user
        }
        return this.http.post("https://critika-backend.herokuapp.comuser/restore-user", param);
    }

    AdminUser(user: string) {

        const param:Object = {
            username: user
        }
        return this.http.post("https://critika-backend.herokuapp.comuser/become-admin", param);
    }
}