import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TocService } from '../toc.service';
import { AuthService } from '../login/auth.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-jbl-main',
  templateUrl: './jbl-main.component.html',
  styleUrls: ['./jbl-main.component.css']
})
export class JblMainComponent implements OnInit {

  public tocList

  constructor(
    private router: Router,
    private tocService: TocService,
    private authService: AuthService,
    private searchService: SearchService
  ) {
      this.tocService.getAllTocs().subscribe(res => {
        this.tocList = res;
      })
    }

  ngOnInit() {

  }

  sendQuery(query) {
    this.router.navigate(['/search'],{queryParams: {query: query}});
    console.log(query);
  }
  preventDefault(event){
    event.preventDefault();
  }
  checkAdmin(){
    return this.authService.checkAdmin();
  }

  getCsv(course){
    event.stopPropagation();
    this.searchService.download(course)
      .subscribe(res => {
        this.download(course, res)
      })
  }

  download(course, contents){
    var link = document.createElement("a");
    link.download = course + ".csv";
    link.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(contents);
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
  }
}
