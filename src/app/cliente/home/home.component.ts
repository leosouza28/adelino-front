import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  imgs: any = {
    img1: {
      img_mobile: "assets/imgs/img-1-mobile.jpeg",
      img_desktop: "assets/imgs/img-1.jpeg",
    },
    img2: {
      img_mobile: "assets/imgs/img-2.jpeg",
    }
  }
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['login']) {
        document.getElementById('buttonLogin')?.click();
      }
    });
  }

  openCardapio() {
    window.open('https://firebasestorage.googleapis.com/v0/b/parque-estreladalva.firebasestorage.app/o/ESTRELA%20DALVA%20CARDA%CC%81PIO%20DIGITAL_20250701_135123_0000.pdf?alt=media&token=516c3a0a-71c1-4947-92a2-6c7599458003')
  }

}
