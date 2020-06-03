import { Component, OnInit, Input } from "@angular/core";
import { Note } from "../note.model";
import { NotesService } from "src/app/services/notes.service";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"],
})
export class NoteComponent implements OnInit {
  @Input() note: Note;

  constructor(private notesService: NotesService) {}

  onEdit() {
    this.notesService.editStarted.emit(this.note);
  }

  onRemove(note: Note) {
    if (confirm("Are you sure?")) {
      this.notesService
        .delete(note)
        .toPromise()
        .then(() => this.notesService.listChanged.emit(true))
        .catch((err) => alert("An error occured: " + err.message));
    }
  }

  ngOnInit() {}
}
