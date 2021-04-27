import { Component, OnInit } from "@angular/core";
import { PRIMARY_OUTLET, Router, UrlTree } from "@angular/router";
import { API } from "../service/APIservice";
import { ServiceService } from "../service/service.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  urlTree: UrlTree;
  video: any;
  formRating: any;
  favorit: any;
  id: any;
  faveroitUser: any;
  rate: any;
  imgUrl: any;
  constructor(private route: Router, private _service: ServiceService) {}

  ngOnInit() {
    this._service.displaySerachBox(false);
    this.urlTree = this.route.parseUrl(this.route.url);
    this.id = this.urlTree.root.children[PRIMARY_OUTLET].segments[1].path;
    this.viewData(this.id);
    this.faveroitUser = JSON.parse(localStorage.getItem("fvoret"));
    this.formRating = 4;
  }

  viewData(id) {
    this._service.getList(API(id).getVideosDetails).subscribe((res) => {
      res.map((res) => {
        return (this.video = {
          title: res.snippet.title,
          liked: res.statistics.likeCount,
          view: res.statistics.viewCount,
          duration: this.getDuration(res.contentDetails.duration),
          description: res.snippet.description,
          thumbnail: res.snippet.thumbnails.high.url,
          rating: res.statistics.favoriteCount,
          publishedAt: new Date(res.snippet.publishedAt),
        });
      });
    });
  }
  getDuration(time) {
    let min = time.substring(time.lastIndexOf("T") + 1, time.lastIndexOf("M"));
    let sec = time.substring(time.lastIndexOf("M") + 1, time.lastIndexOf("S"));
    return `${min} : ${sec}`;
  }
  addToFaverit() {
    this.favorit = true;
    let data = {
      id: this.id,
      favorit: this.favorit,
    };
    localStorage.setItem("fvoret", JSON.stringify(data));
  }
}
