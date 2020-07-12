import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Note } from "../notes/note.model";

@Injectable({
  providedIn: "root",
})
export class ConfirmationDialogService {
  private subject = new Subject<any>();

  constructor() {}

  setConfirmation(
    message: string,
    confirm: (note: Note) => void,
    decline: () => void
  ) {
    let service = this;

    this.subject.next({
      type: "confirm",
      text: message,
      confirm: function (note: Note) {
        // close the modal by passing empty value
        service.subject.next();
        confirm(note);
      },
      decline: function () {
        service.subject.next();
        decline();
      },
    });
  }

  getMessage(): Observable<any> {
    return this.subject;
  }
}
