import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Note } from "../notes/note.model";

@Injectable({
  providedIn: "root",
})
export class ConfirmationDialogService {
  private subject = new Subject<any>();
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

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
        service.renderer.removeClass(document.body, "no-scroll");
        confirm(note);
      },
      decline: function () {
        service.subject.next();
        service.renderer.removeClass(document.body, "no-scroll");
        decline();
      },
    });
  }

  getMessage(): Observable<any> {
    return this.subject;
  }

  getRenderer(): Renderer2 {
    return this.renderer;
  }
}
