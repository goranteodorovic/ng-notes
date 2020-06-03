import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { NotesComponent } from "./notes/notes.component";
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  // { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "verify-email-address", component: VerifyEmailComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "notes", component: NotesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
