import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import * as firebase from "firebase/app";
import { NgForm } from "@angular/forms";
import { User } from "../auth/user";
import { format } from "url";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  editting: boolean = false;
  displayName: string = "";
  photoURL: string = "";
  oldPassword: string = "";
  newPassword: string = "";
  passwordConfirmation: string = "";

  private currentUserData: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onEditCancel(form: NgForm) {
    this.editting = false;
    this.currentUserData = null;
    form.reset();
  }
  onEdit() {
    this.editting = true;
    this.currentUserData = firebase.auth().currentUser;
    this.displayName = this.currentUserData.displayName;
    this.photoURL = this.currentUserData.photoURL;
  }

  onSubmit(form: NgForm) {
    let user = {
      uid: this.currentUserData.uid,
      email: this.currentUserData.email,
      displayName: this.displayName,
      photoURL: this.photoURL,
      emailVerified: this.currentUserData.emailVerified,
    };

    if (
      !form.value.newPasswordChb ||
      (form.value.newPasswordChb &&
        this.newPassword == this.passwordConfirmation)
    ) {
      let updateProfile = this.authService.updateProfile.bind(null, user);
      let updatePassword = this.authService.updatePassword.bind(
        null,
        user.email,
        this.oldPassword,
        form.value.newPassword
      );

      if (!form.value.newPasswordChb) {
        updateProfile().then(() => {
          this.onEditCancel(form);
        });
      } else {
        updateProfile()
          .then(() => {
            updatePassword();
          })
          .then(() => {
            this.onEditCancel(form);
          })
          .catch((e) => console.log);
        // Promise.all([updateProfile, updatePassword])
        //   .then(() => {
        //     this.onEditCancel(form);
        //   })
        //   .catch((e) => console.log);
      }
    } else {
      window.alert("Current password is incorrect");
    }
  }

  onDeleteAcount() {
    let confirm = window.confirm("Are you sure");
    if (confirm) {
      this.editting = false;
      this.authService.deleteAcount();
    }
  }
}
