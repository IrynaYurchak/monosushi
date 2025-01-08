import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscountComponent } from './discount.component'
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommonModule} from "@angular/common";

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
declarations:[DiscountComponent],
      imports: [RouterTestingModule,
      HttpClientTestingModule,
      CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
