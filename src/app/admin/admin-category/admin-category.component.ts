
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { CategoryService } from '../../shared/services/category/category.service';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { error } from 'node:console';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
  providers: [CategoryService]
})
export class AdminCategoryComponent implements OnInit {
  public adminCategories: Array<ICategoryResponse> = [];
  public addBlock = false;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId = 0;

  public categoryForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private storadge: Storage) { }


  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imgPath: [null, Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    });
  }

  add(): void {
    this.addBlock = true;
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.categoryForm.patchValue({
    });
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
        this.loadCategories();
      });
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategories();
      });
    }
    this.addBlock = false;
    this.categoryForm.reset();
  }

  editCategory(category: ICategoryResponse): void {
    this.addBlock = true;
    this.editStatus = true;
    this.isUploaded = true;
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imgPath: category.imgPath
    });
    this.currentCategoryId = category.id;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategories();
    });
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imgPath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }
  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storadgeRef = ref(this.storadge, path);
        const task = uploadBytesResumable(storadgeRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        })
        await task;
        url = await getDownloadURL(storadgeRef);
        return Promise.resolve(url)
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('Wrong format');
    }
    return Promise.resolve(url)
  }
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;

  }
  deleteImg(): void {
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
}


