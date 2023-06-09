import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import {Router} from "../../shared/models/Router";
import {RoutersService} from "../../shared/services/routers.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-routers',
  templateUrl: './routers.component.html',
  styleUrls: ['./routers.component.scss']
})
export class RoutersComponent implements OnInit {
  addRouterForm = new FormGroup({
    name: new FormControl('',{nonNullable: true}),
    ip: new FormControl('',{nonNullable: true}),
  });

  routers: Observable<Router[]> | undefined;
  uid: string | undefined;

  constructor(
    private location: Location,
    private authService: AuthService,
    private routersService: RoutersService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(curruser =>{
      if(curruser){
        console.log(curruser.uid)
        this.uid = curruser.uid;
        this.routers = this.routersService.loadRouters(curruser.uid);
      } else {
        console.log('current logged in user has a value of null.');
      }
    })
  }

  async deleteRouter(router: Router) {
    try {
      await this.routersService.delete(router.id);
      console.log(`Router '${router.name}' deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting router '${router.name}':`, error);
    }
  }

  async onSubmit() {
    if (this.uid!=undefined) {
      const router: Router = {
        ownerId: this.uid,
        id: this.afs.createId(),
        ip: this.addRouterForm.get('ip')?.value as string,
        name: this.addRouterForm.get('name')?.value as string,
      };
      this.routersService.checkIfIPExists(this.uid, router.ip).subscribe((exists: boolean) => {
        if (exists) {
          this.routersService.create(router).then(_ => {
            console.log('Router added successfully.');
          }).catch(error => {
            console.error(error);
          })
        } else {
          console.log('A router with this IP address already exists.');
        }
      });
    } else {
      console.log('current logged in user has a value of null.')
    }
  }

  goBack() {
    this.location.back();
  }
}
