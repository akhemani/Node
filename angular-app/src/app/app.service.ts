import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://127.0.0.1:8080/api/v1';

  getUsers() {
    return this.http.get(this.rootURL + "/users");
  }

  getUserById(id: any) {
    return this.http.get(this.rootURL + "/users/" + id);
  }

  addUser(user: any) {
    return this.http.post(this.rootURL + '/users', { user });
  }

  deleteUser(id: any) {
    return this.http.delete(this.rootURL + '/users/' + id);
  }

  updateUser(user: any) {
    return this.http.put(this.rootURL + '/users', { user });
  }
}