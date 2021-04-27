import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../service/service.service";
import { API } from "../service/APIservice";
import { MatTableDataSource } from "@angular/material";
import { PRIMARY_OUTLET, Router, UrlTree } from "@angular/router";

export interface PeriodicElement {
  title: string;
  videoId: string;
  videoUrl: string;
  channelId: string;
  channelUrl: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  videos: PeriodicElement[];
  displayedColumns: string[] = ["video", "title", "publishDate", "ViewDtails"];
  dataSource;
  searchText: any;
  next: any = true;
  previous: any = false;
  maxResults: any = 8;
  urlTree: UrlTree;

  constructor(private _service: ServiceService, private route: Router) {
    this.applyFilter();
  }

  ngOnInit() {
    this.getChannelId(this.maxResults);
    this._service.displaySerachBox(true);
  }

  getChannelId(maxResults) {
    this._service.getList(API(maxResults).getChannelVideos).subscribe((res) => {
      console.log(res);
      this.videos = res.map((item) => {
        return {
          title: item.snippet.title,
          videoId: item.id.videoId,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          channelId: item.snippet.channelId,
          channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
          channelTitle: item.snippet.channelTitle,
          description: item.snippet.description,
          publishedAt: new Date(item.snippet.publishedAt),
          thumbnail: item.snippet.thumbnails.high.url,
        };
      });
      console.log("this.videos", this.videos);
      this.dataSource = new MatTableDataSource(this.videos);
    });
  }

  applyFilter() {
    this._service.value.subscribe((res) => {
      this.searchText = res as any;
      this.dataSource.filter = this.searchText.trim().toLowerCase();
    });
  }
  sortTitle() {
    this.videos.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    this.dataSource = new MatTableDataSource(this.videos);
  }
  sortDate() {
    this.videos.sort(function (a, b) {
      return (
        (new Date(b.publishedAt) as any) - (new Date(a.publishedAt) as any)
      );
    });
    this.dataSource = new MatTableDataSource(this.videos);
  }
  userPrevious() {
    this.maxResults = this.maxResults - 8;
    this.maxResults == 8 ? (this.previous = false) : (this.previous = true);
    this.getChannelId(this.maxResults);
    this.next = true;
  }
  userNext() {
    this.previous = true;
    this.maxResults += 8;
    this.videos.length == 50 ? (this.next = false) : (this.next = true);
    this.getChannelId(this.maxResults);
  }
}
