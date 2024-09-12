import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedService } from '../../service/shared.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  items: any[] = [];
  page: number = 1;
  limit: number = 1000;
  hasMoreItems: boolean = true; // To manage "Load More" button visibility

  constructor(private quoteService: SharedService, private route: Router) { }

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(page: number = 1): void {

    this.quoteService.getQuotes(this.limit, 0).subscribe((response: any) => {
      if (response.data.length < this.limit) {
        this.hasMoreItems = false;
      }
      this.items = page === 1 ? response.data : [...this.items, ...response.data];
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadQuotes(page);
  }

  logout() {
    this.quoteService.logout();
  }

  navigateToCreateQuote() {
    this.route.navigate(['/create']);
  }
}
