import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }
  getIndexData() {
    this.homeService.getIndex('13099990001').subscribe(res=>{
      console.log(res);
    })
  }

}
