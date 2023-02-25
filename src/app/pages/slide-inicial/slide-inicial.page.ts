import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-slide-inicial',
  templateUrl: './slide-inicial.page.html',
  styleUrls: ['./slide-inicial.page.scss'],
})
export class SlideInicialPage implements OnInit {

  slide1:boolean = true;
  slide2:boolean = false;
  slide3:boolean = false;

  constructor(public router:Router) { }

  ngOnInit() {
  }

  gotoSlide2(){
    this.slide1 = false;
    this.slide1 = false
    this.slide2 = true
  }

  gotoSlide3(){
    this.slide1 = false;
    this.slide2 = false;
    this.slide3 = true
  }

  gotoHome(){
    this.router.navigateByUrl('/home')
  }

}
