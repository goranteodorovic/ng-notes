import { Component, OnInit, OnDestroy, OnChanges } from "@angular/core";
import { NotesService } from "../services/notes.service";
import { Note } from "./note.model";
import { AuthService } from "../services/auth.service";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"],
})
export class NotesComponent implements OnInit, OnDestroy {
  private notes: Array<Note>;
  private uid: string;
  subscription: Subscription;
  private notesObservable: Observable<any>;

  constructor(
    private notesService: NotesService,
    private authService: AuthService
  ) {
    // this.uid = this.authService.uid;
    this.uid = JSON.parse(localStorage.getItem("user")).uid;
  }

  ngOnInit() {
    this.notesService
      .read()
      .toPromise()
      .then((notes) => (this.notes = notes));

    this.subscription = this.notesService.listChanged.subscribe((data) => {
      if (data) {
        this.notesService
          .read()
          .toPromise()
          .then((notes) => {
            this.notes = notes;
          });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
