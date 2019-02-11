import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import * as Constants from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(public http: Http) {}

  auth(form) {
    const data = {
      email: form.value.email,
      password: form.value.password
    };

    const url = Constants.URL_BASE + 'api/login';
    return new Promise(resolve => {
      this.http.post(url, data).subscribe(data => {
        console.log('BIENN');
        return resolve(data.json());
      }, err => {
        //this.loading.hide();
        //this.alerts.show('Ocurrió un error', err, 'Aceptar')
        console.log(err, ' Error Auth');
        return false;
      });
    });
  }

}
