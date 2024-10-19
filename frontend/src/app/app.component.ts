import { Component, Injectable } from '@angular/core';
import { ApiService } from './api.service';  // 引入你将要创建的 API 服务


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private apiService: ApiService) { }

  onClick() {

    this.apiService.getNumbersStream().subscribe(data => {
      console.log('Received :', data);
    });

  }
}
