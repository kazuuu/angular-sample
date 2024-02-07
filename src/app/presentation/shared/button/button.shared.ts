import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'button-shared',
  templateUrl: './button.shared.html',
  styleUrls: ['./button.shared.scss'],
  imports: [NgStyle]
})
export class ButtonShared {

  @Input() title?: string;
  @Input() type?: string = 'button';
  @Input() bgColor?: string = 'lightblue';
  @Output() onClick = new EventEmitter<any>();

  btnStyle = {}

  constructor() { };

  ngOnInit(): void {
    this.btnStyle = {
      'background-color': this.bgColor,
      'padding': '0.5rem',
      'border-radius': '50%',
      'margin': '0.5rem'
    };
  };

  onClickButton(event: any) {
    console.log("ButtonShared Click")
    this.onClick.emit(event);
  }

}
