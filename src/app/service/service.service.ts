import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  value = new Subject();
  display = new Subject();
  constructor(private http: HttpClient) {}

  getList(url): Observable<any> {
    return this.http.get(url).pipe(map((response: any) => response.items));
  }

  searchTitle(data) {
    console.log(data);
    this.value.next(data);
  }
  displaySerachBox(data) {
    this.display.next(data);
  }
}
