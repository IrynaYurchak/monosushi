import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../shared/services/category/category.service';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CategoryService]
})
export class HeaderComponent implements OnInit {
  categories: ICategoryResponse[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((categories: ICategoryResponse[]) => {
      this.categories = categories;
    });
  }

  isMenuOpen: boolean = false;

  toggleMenu(event: Event) {
    event.preventDefault(); 
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}


