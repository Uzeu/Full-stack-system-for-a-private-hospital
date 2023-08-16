import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }


  

  ngOnInit(): void {
    this.zameni();
  }

   images = [
    '/assets/bolnica1.jpg',
    '/assets/bolnica2.jpg',
    '/assets/bolnica3.jpg',
    '/assets/bolnica4.jpg',
    '/assets/bolnica5.jpg',
  ];

  trenutnaSlika=0;
  zameni() {
    setInterval(() => {
      this.trenutnaSlika = (this.trenutnaSlika + 1) % this.images.length;
    }, 3000); 
  }

}
