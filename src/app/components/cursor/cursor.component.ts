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
  mousePressed: boolean = false
  rightHanded: boolean | undefined
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
    this.onMousePressed()
    this.onMouseReleased()
    setInterval(() => {
      if (this.handsfree.data.hands?.multiHandLandmarks[0] !== undefined) {
              let landmarks = this.handsfree.data.hands.multiHandLandmarks[0]
              this.moveCursor(landmarks)
              if (this.rightHanded === undefined) {
                this.checkDominantHand(this.handsfree.data.hands.multiHandedness[0])
              } 
          }
      }, 5)
  }

  checkDominantHand (handData: any) {
    if (handData.label === "Right") {
        this.rightHanded = false
    } else {
        this.rightHanded = true
    }
  }

  handsfreePinchListener (category: string, mousePressed: boolean) {
    this.handsfree.on(category, () => {
      this.mousePressed = mousePressed
    })
  }

  onMousePressed () {
    this.handsfreePinchListener(`finger-pinched-start-1-0`, true)
    this.handsfreePinchListener(`finger-pinched-start-0-0`, true)
  }

  onMouseReleased () {
    this.handsfreePinchListener(`finger-pinched-released-1-0`, false)
    this.handsfreePinchListener(`finger-pinched-released-0-0`, false)
  }

  moveCursor (landmarks: any) {
    this.cursorX = (window.innerWidth - (landmarks[9].x * 1300))
    this.cursorY = (landmarks[9].y * 800)
    if (this.cursor != null) {
      this.cursor.nativeElement.style.left = `${this.cursorX}px`
      this.cursor.nativeElement.style.top = `${this.cursorY}px`
    }
  }
}
