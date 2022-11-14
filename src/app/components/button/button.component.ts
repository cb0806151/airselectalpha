import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @HostListener('click', ['$event']) onClick(event: unknown) {
    console.log(event)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
