import { Injectable, NgZone } from '@angular/core';
import auth from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class NgAuthService {
  userState: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        sessionStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(sessionStorage.getItem('user'));
      } else {
        sessionStorage.setItem('user', null);
        JSON.parse(sessionStorage.getItem('user'));
      }
    })
  }

  SignIn(email, password) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        alert(error)
      })
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['']);
          this.SetUserData(userCredential.user);
        }
      })
  }

  SignUp(user) {
    console.log('user', user);
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.userState = user;
        this.SendVerificationMail();
        this.SetUserData(userCredential.user);
        console.log('creadential', userCredential);
        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName,
          photoURL: user.no,

        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email-verification']);
      })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
        this.router.navigate([''])
      }).catch((error) => {
        window.alert(error)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userState, {
      merge: true
    })
  }

  getUserState() {
    return this.afAuth.authState;
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.router.navigate(['']);
    })
  }
}