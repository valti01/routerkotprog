import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {FormControl, FormGroup, ɵFormGroupRawValue, ɵGetProperty, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string | null, password: string | null) {
    return this.auth.signInWithEmailAndPassword(<string>email, <string>password);
  }

  signup(email: ɵGetProperty<ɵTypedOrUntyped<{ password: FormControl<string | null>; rePassword: FormControl<string | null>; name: FormGroup<{ firstname: FormControl<string | null>; lastname: FormControl<string | null> }>; email: FormControl<string | null> }, ɵFormGroupRawValue<{ password: FormControl<string | null>; rePassword: FormControl<string | null>; name: FormGroup<{ firstname: FormControl<string | null>; lastname: FormControl<string | null> }>; email: FormControl<string | null> }>, any>, "email"> | undefined, password: ɵGetProperty<ɵTypedOrUntyped<{ password: FormControl<string | null>; rePassword: FormControl<string | null>; name: FormGroup<{ firstname: FormControl<string | null>; lastname: FormControl<string | null> }>; email: FormControl<string | null> }, ɵFormGroupRawValue<{ password: FormControl<string | null>; rePassword: FormControl<string | null>; name: FormGroup<{ firstname: FormControl<string | null>; lastname: FormControl<string | null> }>; email: FormControl<string | null> }>, any>, "password"> | undefined) {
    return this.auth.createUserWithEmailAndPassword(<string>email, <string>password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

}
