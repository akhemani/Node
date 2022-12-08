import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

class User {
  id!: Number;
  age!: string;
  name!: string;
  gender!: string;
  company!: string;
  email!: string;
  phone!: string;
  about!: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private appService: AppService, private _router: Router) { }

  user!: User;

  ngOnInit(): void {
    const paramsObj: any = this.route.snapshot.paramMap;
    if (paramsObj.params.id) {
      this.appService.getUserById(paramsObj.params.id).subscribe((res: any) => {
        this.user = {
          id: res?.user?.id || "",
          age: res?.user?.age || "",
          name: res?.user?.name || "",
          gender: res?.user?.gender || "",
          company: res?.user?.company || "",
          email: res?.user?.email || "",
          phone: res?.user?.phone || "",
          about: res?.user?.about || "",
        };
      });
    }
  }

  onSubmit(userForm: NgForm) {
    const { age, name, gender, company, email, phone, about } = userForm.form.value;
    this.user = {
      id: this.user.id,
      age,
      name,
      gender,
      company,
      email,
      phone,
      about,
    };
    this.appService.updateUser(this.user).subscribe((data: any) => {
      if (data.status == 'success') {
        this._router.navigate(['all-users']);
      }
    });
  }

  reset(userForm: NgForm) {
    userForm.resetForm();
  }

  cancel() {
    this._router.navigate(['all-users']);
  }
}
