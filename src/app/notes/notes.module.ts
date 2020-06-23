import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NotesRoutingModule } from "./notes-routing.module";
import { NotesComponent } from "./notes.component";
import { NoteComponent } from "./note/note.component";
import { NoteDetailComponent } from "./note-detail/note-detail.component";
import { NoteEditComponent } from "./note-edit/note-edit.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    NoteDetailComponent,
    NoteEditComponent,
  ],
  imports: [CommonModule, NotesRoutingModule, FormsModule],
})
export class NotesModule {}
