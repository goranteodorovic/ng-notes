import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "../note.model";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-note-edit",
  templateUrl: "./note-edit.component.html",
  styleUrls: ["./note-edit.component.css"],
})
export class NoteEditComponent implements OnInit, OnDestroy {
  note: Note;
  isEdit: boolean = false;
  subscription: Subscription;
  title: string = "";
  content: string = "";

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.note = new Note("", "", "", "");
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let id = params["id"];
      this.notesService.getNoteById(id).subscribe((note: Note) => {
        if (note) {
          this.isEdit = true;
          this.setNoteDataForEdit(note);
        } else {
          if (this.router.url != "/notes/new") {
            this.router.navigate(["/notes"]);
          }
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    if (this.isEdit) {
      this.note.title = form.value.title;
      this.note.content = form.value.content;

      this.notesService.update(this.note).subscribe(
        (note) => {
          this.onClear(form);
        },
        (err) => window.alert
      );
    } else {
      this.notesService.create(this.title, this.content).subscribe(
        (note) => {
          this.notesService.noteAdded.emit(note);
          this.onClear(form);
        },
        (err) => window.alert
      );
    }
  }

  onClear(form: NgForm) {
    form.reset();
    this.isEdit = false;
    this.note = new Note("", "", "", "");
    this.router.navigate(["/notes"]);
  }

  setNoteDataForEdit(note: Note) {
    this.note = note;
    this.title = note.title;
    this.content = note.content;
    this.isEdit = true;
  }
}
