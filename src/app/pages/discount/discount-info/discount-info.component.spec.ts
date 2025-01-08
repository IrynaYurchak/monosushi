import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscountInfoComponent } from './discount-info.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IDiscountResponse } from '../../../shared/interfaces/discount/discount.interface';
import {RouterTestingModule} from "@angular/router/testing";

describe('DiscountInfoComponent', () => {
  let component: DiscountInfoComponent;
  let fixture: ComponentFixture<DiscountInfoComponent>;

  beforeEach(async () => {
    const mockDiscount: IDiscountResponse = {
      id: '1',
      data: '2025-01-01',
      name: 'Mock Discount',
      title: 'Mock Title',
      description: 'Line 1\nLine 2\nLine 3',
      imgPath: 'mock-image-path.jpg',
    };

    await TestBed.configureTestingModule({
      declarations: [DiscountInfoComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ discount: mockDiscount }), // Мок даних від Resolver
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly initialize userDiscount', () => {
    expect(component.userDiscount.id).toBe('1');
    expect(component.userDiscount.name).toBe('Mock Discount');
    expect(component.userDiscount.title).toBe('Mock Title');
    expect(component.userDiscount.description).toBe('Line 1\nLine 2\nLine 3');
    expect(component.userDiscount.imgPath).toBe('mock-image-path.jpg');
  });

  it('should split description into lines', () => {
    const descriptionLines = component.splitDescription(component.userDiscount.description);
    expect(descriptionLines).toEqual(['Line 1', 'Line 2', 'Line 3']);
  });
});
