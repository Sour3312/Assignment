import { Injectable } from '@angular/core' ;

@Injectable({
    providedIn: 'root'
})
export class AppConstants {

    public static URLs = {
        "HOME" : "",
        "LOGIN": "/init",
        "DASHBOARD": "/dash",
        "CREATEQUOTE":"/create"
    }
}
