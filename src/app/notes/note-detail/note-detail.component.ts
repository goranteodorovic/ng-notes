import { Component, OnInit, Input } from "@angular/core";
import { Note } from "../note.model";
import { NotesService } from "src/app/services/notes.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-note-detail",
  templateUrl: "./note-detail.component.html",
  styleUrls: ["./note-detail.component.css"],
})
export class NoteDetailComponent implements OnInit {
  @Input() note: Note;

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
          this.note = note;
        } else {
          this.router.navigate(["/notes"]);
        }
      });
    });
  }

  onRemove(note: Note) {
    if (confirm("Are you sure?")) {
      this.notesService.delete(note).subscribe(() => {
        this.notesService.noteDeleted.emit(note);
        this.router.navigate(["/notes"]);
      });
    }
  }

  onEdit() {
    this.notesService.editStarted.emit(this.note);
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
}
