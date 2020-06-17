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
  @Output() notesChanged = new EventEmitter<Array<Note>>();

  @Output() noteAdded = new EventEmitter<Note>();
  @Output() noteDeleted = new EventEmitter<Note>();

  private userId = JSON.parse(localStorage.getItem("user")).uid;
  private userToken = JSON.parse(localStorage.getItem("user")).idToken;
  private notes: Array<Note> = [];
  public fetching: boolean = true;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.read().subscribe((notes) => {
      this.notes = notes;
      this.listChanged.emit(true);
    });

    this.noteAdded.subscribe((note: Note) => {
      this.notes.push(note);
    });

    this.noteDeleted.subscribe((note: Note) => {
      let notes = this.notes.filter((each) => each.id != note.id);
      this.notes = notes;
    });
  }

  // observable / returns a note
  getNoteById(id: string) {
    if (this.fetching) {
      // fetch a note from the api
      let apiUrl = environment.firebaseConfig.databaseURL + "/notes.json";

      return this.http.get(apiUrl).pipe(
        map((responseData) => {
          const resultsArray = [];
          for (const key in responseData) {
            if (
              responseData.hasOwnProperty(key) &&
              responseData[key]["uid"] == this.userId &&
              responseData[key]["id"] == id
            ) {
              resultsArray.push({ ...responseData[key], id: key });
            }
          }
          this.fetching = false;
          return resultsArray[0];
        })
      );
    } else {
      // get note from notes array
      let noteFound = this.notes.filter((note) => note.id === id)[0];
      return Observable.create((observer) => {
        observer.next(noteFound);
        observer.complete();
      });
    }
  }

  // observable / returns added note on success
  create(title: string, content: string) {
    let note = new Note(this.userId, this.db.createPushId(), title, content);
    let url =
      environment.firebaseConfig.databaseURL +
      "/notes/" +
      note.id +
      ".json?auth=" +
      this.userToken;
    return this.http.put<Note>(url, note);
  }

  read() {
    let apiUrl = environment.firebaseConfig.databaseURL + "/notes.json";

    return this.http.get(apiUrl).pipe(
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
        this.fetching = false;
        return resultsArray;
      })
    );
  }

  // observable / returns added note on success
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

  // observable / returns ??
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
