import { Injectable, EventEmitter } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../auth/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private user: Observable<firebase.User>
  private userData: User; // used in Dashboard
  // userStatusChange = new EventEmitter<boolean>();

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    // set the user ( private / localStorage )
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        // localStorage needed for isLoggedIn
        localStorage.setItem("user", JSON.stringify(user));
        // this.userStatusChange.emit(true);
      } else {
        this.userData = null;
        localStorage.removeItem("user");
        // this.userStatusChange.emit(false);
      }
      // token will be used to authenticate http requests
      this.afAuth.idToken.subscribe((token) => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          user.idToken = token;
          localStorage.setItem("user", JSON.stringify(user));
        }
      });
    });
  }
  // used in Signin
  signIn(email: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigate(["dashboard"]);
      })
      .catch((err) => window.alert("something went wrong: " + err.message));
  }
  //used in Signup
  signUp(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        (res) => {
          this.sendVerificationMail();
        },
        (err) => window.alert(err)
      );
  }
  // used in Dashboard
  signOut() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("user");
        this.router.navigate(["home"]);
      });
  }
  // used here / VerifyEmail
  sendVerificationMail() {
    return firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then((res) => this.router.navigate(["verify-email-address"]))
      .catch((e) => window.alert("unable to send the verification emai"));
  }

  // used in Dashboard
  updateProfile(user: User) {
    return firebase.auth().currentUser.updateProfile(user);
  }
  updatePassword(email: string, password: string, newPassword: string) {
    let user = firebase.auth().currentUser;
    let credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return user.reauthenticateWithCredential(credentials).then(() => {
      user.updatePassword(newPassword);
    });
  }
  deleteAcount() {
    return firebase
      .auth()
      .currentUser.delete()
      .then(() => this.router.navigate(["signin"]))
      .catch((e) => window.alert("an error occured: " + e.message));
  }

  // used in AuthGuard / Navigation /
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified ? true : false;
  }
}
