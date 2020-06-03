import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { pipe, Observable } from "rxjs";
import { map, filter, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Note } from "../notes/note.model";
import { AuthService } from "./auth.service";
import { User } from "../auth/user.model";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  @Output() editStarted = new EventEmitter<Note>();
  @Output() listChanged = new EventEmitter<boolean>();

  private userId = JSON.parse(localStorage.getItem("user")).uid;
  private userToken = JSON.parse(localStorage.getItem("user")).idToken;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  create(note: Note) {
    // note.uid = this.authService.uid;
    note.uid = this.userId;
    /* if want an id to be the same, then need to use put instead of post */
    note.id = this.db.createPushId();
    let url =
      environment.firebaseConfig.databaseURL +
      "/notes/" +
      note.id +
      ".json?auth=" +
      this.userToken;
    return this.http.put<Note>(url, note);

    // let headers = new HttpHeaders({
    //   Authorization: "Bearer " + this.authService.userToken,
    // });
    // let options = { headers: headers };

    // return firebase
    //   .auth()
    //   .currentUser.getIdToken(/* forceRefresh */ true)
    //   .then((idToken) => {
    //     // Send token to your backend via HTTPS
    //   })
  }

  read() {
    return this.http
      .get(environment.firebaseConfig.databaseURL + "/notes.json")
      .pipe(
        map((responseData) => {
          const resultsArray = [];
          for (const key in responseData) {
            if (
              responseData.hasOwnProperty(key) &&
              responseData[key]["uid"] == this.userId
            ) {
              resultsArray.push({ ...responseData[key], id: key });
            }
          }
          return resultsArray;
        })
      );
  }

  readAsObservable(user: User): Observable<Array<Note>> {
    let apiUrl = environment.firebaseConfig.databaseURL + "/notes.json";
    return this.http.get(apiUrl).pipe(
      map((responseData) => {
        const resultsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            if (responseData[key]["uid"] == user.uid) {
              resultsArray.push({ ...responseData[key], id: key });
            }
          }
        }
        console.log("notes", resultsArray);
        return resultsArray;
      })
    );
    // return Observable.create(
    //   this.http
    //     .get(environment.firebaseConfig.databaseURL + "/notes.json")
    //     .pipe(
    //       map((responseData) => {
    //         const resultsArray = [];
    //         for (const key in responseData) {
    //           if (responseData.hasOwnProperty(key)) {
    //             resultsArray.push({ ...responseData[key], id: key });
    //           }
    //         }
    //         return resultsArray;
    //       })
    //     )
    // );
  }

  update(note: Note) {
    let url =
      environment.firebaseConfig.databaseURL +
      "/notes/" +
      note.id +
      ".json?auth=" +
      this.userToken;
    return this.http.put<Note>(url, note);
    // can also use patch / partly update content
  }

  delete(note: Note) {
    let url =
      environment.firebaseConfig.databaseURL +
      "/notes/" +
      note.id +
      ".json?auth=" +
      this.userToken;
    return this.http.delete(url);
  }
}
