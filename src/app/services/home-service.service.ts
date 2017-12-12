import { Injectable } from '@angular/core';
import { Http, Response, Headers ,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TdConfig } from '../config/td-config';
@Injectable()
export class HomeService {
    headers = new Headers({
        'Content-Type': 'application/json', 
        "Accept": "*/*",
        'X-Auth-Token': '',
    });
    private serveUrl = new TdConfig().serveUrl;
    constructor(private http: Http) { }
    getIndex(mobile: string): Observable<any> {
        // let url = `${this.serveUrl}/api/v11/vcode`
        let url = `${this.serveUrl}/api/appLogin/login.json`
        // let url = `/api/v11/vcode`
        console.log(url);
        let params = new URLSearchParams();
        params.set('accountNo', '23432');
        params.set('passWord', '23423423');
        // return this.http.get(url, { search: params, headers: this.headers })
        //     .map((response: Response) => response.json());
            return this.http.post(url, JSON.stringify({
                accountNo:'23234',
                passWord:'2343454'
            }), {headers: this.headers})
            .map((response: Response) => response.json())
        
    //     let url = `${this.serveUrl}/api/index`;
    //     let url = `${this.serveUrl}/generated/docs/guide/ngmodule-faq.json`;
    //     return this.http.get(url, { headers: this.headers })
    //         .map((response: Response) => response.json());
    }
    getCode(mobile: string): Observable<any> {
        let url = `${this.serveUrl}/api/v11/vcode`
        // let url = `/api/v11/vcode`
        let params = new URLSearchParams();
        params.set('mobile', mobile);
        params.set('debug', 'true');
        return this.http.get(url, { search: params, headers: this.headers })
            .map((response: Response) => response.json());
    }

}