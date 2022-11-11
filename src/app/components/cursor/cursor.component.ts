import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// @ts-ignore
import Handsfree from "handsfree";

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements AfterViewInit {
  @ViewChild('cursor', {static: false}) cursor: ElementRef | undefined
  cursorX: number = 0
  cursorY: number = 0
  handsfree = new Handsfree({
    hands: {
      enabled: true,
      maxNumHands: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.5
    }
  })

  constructor() { }

  ngAfterViewInit(): void {
    this.handsfree.start(() => {
        console.log('started')
    });
    setInterval(() => {
      if (this.handsfree.data.hands?.multiHandLandmarks[0] !== undefined) {
              let landmarks = this.handsfree.data.hands.multiHandLandmarks[0]
              this.moveCursor(landmarks)
              // this.setPinchListener()
          }
      }, 5)
  }

  // setPinchListener () {
  //   this.handsfree.on(`finger-pinched-start-${true ? 1 : 0}-0`, () => {
  //       console.log('clicked')
  //   })

  //   this.handsfree.on(`finger-pinched-released-${true ? 1 : 0}-0`, () => {
  //     console.log('stopped clicking')
  //   })
  // }

  moveCursor (landmarks: any) {
    this.cursorX = (window.innerWidth - (landmarks[9].x * 1300))
    this.cursorY = (landmarks[9].y * 800)
    if (this.cursor != null) {
      this.cursor.nativeElement.style.left = `${this.cursorX}px`
      this.cursor.nativeElement.style.top = `${this.cursorY}px`
    }
  }
}
