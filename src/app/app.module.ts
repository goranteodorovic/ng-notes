import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";

import { environment } from "../environments/environment";
import { NavigationComponent } from "./navigation/navigation.component";
import { HomeComponent } from "./home/home.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthService } from "./services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { NotesComponent } from "./notes/notes.component";
import { NoteComponent } from "./notes/note/note.component";
import { NotesService } from "./services/notes.service";
import { NoteEditComponent } from "./notes/note-edit/note-edit.component";
import { AuthGuard } from "./services/auth-guard.service";
import { AboutComponent } from "./about/about.component";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavigationComponent,
    HomeComponent,
    VerifyEmailComponent,
    DashboardComponent,
    SigninComponent,
    NotesComponent,
    NoteComponent,
    NoteEditComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AngularFireAuth, AuthService, NotesService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
