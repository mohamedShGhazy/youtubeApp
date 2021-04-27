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
  deisplay: any = true;
  constructor(private servce: ServiceService) {
    this.servce.displaySerachBox(true);
    this.boxDisplay();
  }

  applyFilter(event) {
    this.servce.searchTitle(event.target.value);
  }
  boxDisplay() {
    this.servce.display.subscribe((res) => {
      this.deisplay = res;
    });
  }
}
