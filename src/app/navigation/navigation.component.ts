import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NotesService } from "../services/notes.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.authService.userStatusChange.subscribe();
  }
}
