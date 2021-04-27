import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { ListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "channel-list",
    pathMatch: "full",
  },
  {
    path: "channel-list",
    component: ListComponent,
  },
  {
    path: "video-dtails/:id",
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
