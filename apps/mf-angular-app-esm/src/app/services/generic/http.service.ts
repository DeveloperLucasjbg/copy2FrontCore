import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export abstract class HttpService {
    private baseUrl = `${environment.API_URL}${environment.API_PORT}${environment.API_PATH}`;
    protected getUrl(path: string) {
        return `${this.baseUrl}${path} `
    }
}