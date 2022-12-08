import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { Router } from '@angular/router';

export interface User {
  id: Number;
  age: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  about: string;
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor(private appService: AppService, private _router: Router) { }

  displayedColumns: string[] = ['id', 'age', 'name', 'gender', 'company', 'email', 'phone', 'about', 'action'];
  dataSource: any[] = [];
  USERS: User[] = [];

  ngOnInit(): void {
    this.appService.getUsers().subscribe((data: any) => {
      this.dataSource = [];
      this.USERS = [];
      data.users.forEach((ele: any) => {
        const user: User = {
          id: ele.id,
          age: ele.age,
          name: ele.name,
          gender: ele.gender,
          company: ele.company,
          email: ele.email,
          phone: ele.phone,
          about: ele.about,
        };
        this.USERS.push(user);
      });
      this.dataSource = this.USERS;
    });
  }

  addUser(): void {
    this.appService.addUser({
      "id": this.USERS.length + 1,
      "age": 31,
      "name": "Leann Kane",
      "gender": "female",
      "company": "ZENSURE",
      "email": "leannkane@zensure.com",
      "phone": "+91 (951) 590-3333",
      "about": "Voluptate ex ipsum qui .\r\n"
    }).subscribe((data: any) => {
      const dt = JSON.stringify(data);
      if (data.status == 'success') {
        this.ngOnInit();
      }
    });
  }

  deleteUser(id: any): void {
    this.appService.deleteUser(id).subscribe((data: any) => {
      const dt = JSON.stringify(data);
      if (data.status == 'success') {
        this.ngOnInit();
      }
    });
  }

  editUser(id: any): void {
    this._router.navigate(['edit-user', id])
  }

}
