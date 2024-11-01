import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { CategoryService } from '../../shared/services/category/category.service';
import { ProductService } from '../../shared/services/product/product.service';
import { ImageService } from '../../shared/services/image/image.service';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.scss',
  providers: [ProductService, CategoryService]
})
export class AdminProductComponent implements OnInit {
  public adminProducts: Array<IProductResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];
  public productForm!: FormGroup;
  public addBlock = false;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId = 0;
  private currenProductId = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productServise: ProductService,
    private imageServise: ImageService
  ) { }
  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
  }
  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imgPath: [null, Validators.required],
      count: [1]
    });
  }
  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    });
  }
  loadProduct(): void {
    this.productServise.getAll().subscribe(data => {
      this.adminProducts = data;

    });
  }

  add(): void {
    this.addBlock = true;
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.productForm.patchValue({
    });
  }


  addProduct(): void {
    if (this.editStatus) {
      this.productServise.update(this.productForm.value, this.currenProductId).subscribe(() => {
        this.loadProduct();
      });
    } else {
      this.productServise.create(this.productForm.value).subscribe(() => {
        this.loadProduct();
      });
    }
    this.addBlock = false;
    this.productForm.reset();

  }

  editProduct(product: IProductResponse): void {
    this.addBlock = true;
    this.editStatus = true;
    this.isUploaded = true;
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imgPath: product.imgPath
    });
    this.currenProductId = product.id;
  }


  deleteProduct(product: IProductResponse): void {
    this.productServise.delete(product.id).subscribe(() => {
      this.loadProduct();
    })
  }


  upload(event: any): void {
    const file = event.target.files[0];
    this.imageServise.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imgPath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;

  }
  deleteImg(): void {
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
}