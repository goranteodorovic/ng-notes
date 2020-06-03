import { Component, OnInit } from "@angular/core";
import { NgForm, FormControl } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  email = "";
  password = "";
  passwordConfirmation = "";

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["home"]);
    }
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (this.password == this.passwordConfirmation) {
      this.authService.signUp(this.email, this.password);
    } else {
      window.alert("password != passwordConfirmation");
    }
  }
}
