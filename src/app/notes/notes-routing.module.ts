import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NotesComponent } from "./notes.component";
import { NoteEditComponent } from "./note-edit/note-edit.component";
import { NoteDetailComponent } from "./note-detail/note-detail.component";

const routes: Routes = [
  {
    path: "",
    component: NotesComponent,
    children: [
      { path: "new", component: NoteEditComponent },
      { path: ":id", component: NoteDetailComponent },
      { path: ":id/edit", component: NoteEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
