import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/User';
import {UserService} from '../../shared/services/user.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: Observable<User> | undefined;
  editFirstName = false;
  editLastName = false;
  showModifyButton = true;
  firstNameControl = new FormControl('');
  lastNameControl = new FormControl('');
  userId: string | undefined;

  constructor(
    private location: Location,
    private authService: AuthService,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(curruser =>{
      if(curruser){
        console.log(curruser.uid)
        this.user = this.userService.getById(curruser.uid);
        this.user.subscribe(user => {
          this.userId = curruser.uid;
          this.firstNameControl.setValue(user?.firstname);
          this.lastNameControl.setValue(user?.lastname);
        });
      } else {
        console.log('current logged in user has a value of null.');
      }
    })
  }

  saveFirstName() {
    if (this.firstNameControl.value != null && this.userId != undefined) {
      this.userService.updateFirstName(this.userId,this.firstNameControl.value)
    }
    this.editFirstName = false;
  }

  saveLastName() {
    if (this.lastNameControl.value != null && this.userId != undefined) {
      this.userService.updateLastName(this.userId,this.lastNameControl.value)
    }
    this.editLastName = false;
  }


  goBack() {
    this.location.back();
  }
}
