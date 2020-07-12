import { Component, OnInit, Input } from "@angular/core";
import { Note } from "../note.model";
import { NotesService } from "src/app/services/notes.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ConfirmationDialogService } from "src/app/services/confirmation-dialog.service";

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
    private route: ActivatedRoute,
    private confDiaService: ConfirmationDialogService
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
    let that = this;
    this.confDiaService.setConfirmation(
      "Are yoiu sure you know what you're doing?",
      function () {
        //ACTION: Do this If user says YES
        that.notesService.delete(note).subscribe(() => {
          that.notesService.noteDeleted.emit(note);
          that.router.navigate(["/notes"]);
        });
      },
      function () {
        //ACTION: Do this if user says NO
      }
    );
  }

  onEdit() {
    this.notesService.editStarted.emit(this.note);
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
}
