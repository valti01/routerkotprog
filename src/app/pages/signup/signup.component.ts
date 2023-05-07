import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  signUpForm = new FormGroup({
    email: new FormControl('',{nonNullable: true}),
    password: new FormControl('',{nonNullable: true}),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private location: Location,private router: Router, private authService: AuthService, private userService: UserService, private dateFormatPipe : DateFormatPipe) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dateFormatPipe.transform(1000)
    console.log(this.signUpForm.value);
    this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
      console.log(cred);
      const user: User ={
        id:cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        username: this.signUpForm.get('email')?.value.split('@')[0] as string,
        firstname:this.signUpForm.get('name.firstname')?.value as string,
        lastname:this.signUpForm.get('name.lastname')?.value as string
      };
      this.userService.create(user).then(_ => {
        console.log('User added successfully.');
        this.router.navigateByUrl('/routers');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });

  }

  goBack() {
    this.location.back();
  }

}
