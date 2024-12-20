import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cabinet',
  standalone: false,
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss'
})
export class CabinetComponent implements OnInit {
  constructor(
    private router: Router){}

ngOnInit(): void {

}
}
