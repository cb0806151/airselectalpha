import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string = "";
  @Input() link?: string = "";
  @HostListener('click', ['$event']) onClick(event: unknown) {
    console.log(event)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
