import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "../note.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-note-edit",
  templateUrl: "./note-edit.component.html",
  styleUrls: ["./note-edit.component.css"],
})
export class NoteEditComponent implements OnInit, OnDestroy {
  note: Note = new Note("", "", "", "");
  isEdit: boolean = false;
  subscription: Subscription;
  title: string;
  content: string;

  constructor(private notesService: NotesService) {}

  onClear(form: NgForm) {
    form.reset();
    this.isEdit = false;
    this.note = new Note("", "", "", "");
  }

  onSubmit(form: NgForm) {
    this.note.title = form.value.title;
    this.note.content = form.value.content;
    let query: Promise<any>;

    if (this.isEdit) {
      query = this.notesService.update(this.note).toPromise();
    } else {
      query = this.notesService.create(this.note).toPromise();
    }

    query
      .then(() => this.notesService.listChanged.emit(true))
      .then(() => this.onClear(form))
      .catch((err) => window.alert("An error occured: " + err.message));
  }

  ngOnInit() {
    this.subscription = this.notesService.editStarted.subscribe(
      (note: Note) => {
        this.note = note;
        this.title = note.title;
        this.content = note.content;
        this.isEdit = true;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
