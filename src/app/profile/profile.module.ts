import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { ProfileComponent } from "./profile.component";
import { DashboardRoutingModule } from "./profile-routing.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, DashboardRoutingModule, FormsModule],
})
export class ProfileModule {}
