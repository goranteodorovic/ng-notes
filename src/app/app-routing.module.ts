import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { HomeComponent } from "./home/home.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
// import { DashboardComponent } from "./dashboard/dashboard.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthGuard } from "./services/auth-guard.service";
// import { NotesComponent } from "./notes/notes.component";
// import { NoteEditComponent } from "./notes/note-edit/note-edit.component";
// import { NoteDetailComponent } from "./notes/note-detail/note-detail.component";

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
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "notes",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./notes/notes.module").then((m) => m.NotesModule),
  },
  // {
  //   path: "dashboard",
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: "notes",
  //   component: NotesComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: "new", component: NoteEditComponent },
  //     { path: ":id", component: NoteDetailComponent },
  //     { path: ":id/edit", component: NoteEditComponent },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
