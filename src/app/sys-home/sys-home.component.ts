import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sys-home',
  templateUrl: './sys-home.component.html',
  styleUrls: ['./sys-home.component.scss']
})
export class SysHomeComponent implements OnInit {

  ArtWroksURL = 'https://www.facebook.com/CharlotteDreamwork/';

  constructor() { }

  ngOnInit() {
  }

  goURL(event, newUrl: string) {


    switch(newUrl) {
      case 'ArtWork': {
        window.open(this.ArtWroksURL);
        break;
      }

      default: {
        window.open(newUrl);
        break;
      }
    }

  }

}
