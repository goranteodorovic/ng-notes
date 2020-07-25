import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ConfirmationDialogService } from "../services/confirmation-dialog.service";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.css"],
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  message: any;
  subscription: Subscription;

  constructor(private confDiaService: ConfirmationDialogService) {}

  ngOnInit() {
    this.subscription = this.confDiaService
      .getMessage()
      .subscribe((message) => {
        this.message = message;
        this.confDiaService.getRenderer().addClass(document.body, "no-scroll");
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
