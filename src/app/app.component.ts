import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
} from 'ngx-ui-loader';
import { SharedService } from './service/shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private sharedService:SharedService){}

  ngOnInit(): void {
      this.sharedService.initLogin();
  }
}
