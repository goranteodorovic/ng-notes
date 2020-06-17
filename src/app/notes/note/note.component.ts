import { Component, OnInit, Input } from "@angular/core";
import { Note } from "../note.model";
import { NotesService } from "src/app/services/notes.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"],
})
export class NoteComponent implements OnInit {
  @Input() note: Note;

  constructor(private notesService: NotesService, private router: Router) {}

  onDetail(note: Note) {
    this.router.navigate(["/notes", this.note.id]);
  }

  ngOnInit() {}
}
