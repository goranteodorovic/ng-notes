import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },

  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "verify-email-address", component: VerifyEmailComponent },
  {
    path: "profile",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "notes",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./notes/notes.module").then((m) => m.NotesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
