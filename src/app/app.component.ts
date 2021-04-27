import { Component } from "@angular/core";
import { PRIMARY_OUTLET, Router, UrlTree } from "@angular/router";
import { ServiceService } from "./service/service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  urlTree: UrlTree;
  deisplay: any;
  constructor(private servce: ServiceService) {
    this.servce.display.subscribe((res) => {
      this.deisplay = res;
      console.log(this.deisplay);
    });
  }

  applyFilter(event) {
    console.log((event.target as HTMLInputElement).value);
    this.servce.searchTitle(event.target.value);
  }
}
