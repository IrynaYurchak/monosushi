import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IDiscountResponse } from '../../shared/interfaces/discount/discount.interface';
import { DiscountService } from '../../shared/services/discount/discount.service';
import { ImageService } from '../../shared/services/image/image.service';

@Component({
  selector: 'app-admin-discount',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss'],
  providers: [DiscountService, ImageService]
})
export class AdminDiscountComponent {
  public addBlock = false;
  public editStatus = false;
  public adminDiscountes: Array<IDiscountResponse> = [];
  public discountForm!: FormGroup;
  private currentDiscountId = '';
  public uploadPercent!: number;
  public isUploaded = false;
  constructor(
    private fb: FormBuilder,
    private DiscountService: DiscountService,
    private ImageService:ImageService
  ) { }
  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscountes();

  }
  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      data: [null, Validators.required],
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imgPath: [null, Validators.required]
    });
  }
  add(): void {
    this.addBlock = true;
    this.editStatus = false;
    this.discountForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.discountForm.patchValue({
    });

  }
  loadDiscountes(): void {
    this.DiscountService.getAll().subscribe(data => {
      this.adminDiscountes = data
    })
  }
  addDiscount(): void {
    if (this.editStatus) {
      this.DiscountService.update(this.discountForm.value, this.currentDiscountId).subscribe(() => {
        this.loadDiscountes()
      })
    } else {
      this.DiscountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscountes()
      })
    }
    this.discountForm.reset();
    this.editStatus = false;
    this.addBlock = false;
  }

  editDiscount(discount: IDiscountResponse): void {
    this.isUploaded = true;
    this.editStatus = true;
    this.addBlock = true;
    this.discountForm.patchValue({
      data: discount.data,
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imgPath: discount.imgPath
    })

    this.currentDiscountId = discount.id;

  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.DiscountService.delete(discount.id).subscribe(() => {
      this.loadDiscountes();
    })

  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.ImageService.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imgPath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;

  }
  deleteImg():void{
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
}
