import { Component, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
// @ts-ignore
import Handsfree from "handsfree";

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements AfterViewInit {
  @ViewChild('cursor', {static: false}) cursor: ElementRef | undefined
  variance = 10
  jitterReduction = true
  cursorX: number = 0
  cursorY: number = 0
  mousePressed: boolean = false
  rightHanded: boolean | undefined
  hoveredElem: any
  clickedElem: any
  handsfree = new Handsfree({
    hands: {
      enabled: true,
      maxNumHands: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.5
    }
  })

  constructor (@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    this.handsfree.start(() => {
        console.log('started')
    });
    this.onMousePressed()
    this.onMouseReleased()
    setInterval(() => {
      if (this.handsfree.data.hands?.multiHandLandmarks[0] !== undefined) {
          let landmarks = this.handsfree.data.hands.multiHandLandmarks[0]
          this.rightHanded = this.handsfree.data.hands.multiHandedness[0].label === "Right"
          this.moveCursor(landmarks)
          this.checkElementsNearCursor()
          this.checkIfHovered()
      }
      }, 5)
  }

  handsfreePinchListener (category: string, mousePressed: boolean) {
    this.handsfree.on(category, () => {
      this.mousePressed = mousePressed
      if (mousePressed) this.checkIfClicking()
      if (this.cursor != null) this.cursor.nativeElement.style.background = mousePressed ? 'lime' : 'red'
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

  checkElementsNearCursor () {
    let elems = document.elementsFromPoint(this.cursorX, this.cursorY)
    this.hoveredElem = elems.find(e => e.classList.contains("hoverable"))
    this.clickedElem = elems.find(e => e.classList.contains("clickable"))
    // scrolledElem = elems.find(e => e.classList.contains("scrollable"))
    // drewElem = elems.find(e => e.classList.contains("drawable"))
}

checkIfClicking () {
  if (this.clickedElem !== undefined) {
    console.log('clicked')
    this.clickedElem.click();
  } 
}

  checkIfHovered () {
    var allClickableElements = this.document.querySelectorAll('.hoverable')
    allClickableElements.forEach((elem: any) => {
        elem.classList.remove('hovered')
    });
    if (this.hoveredElem !== undefined) this.hoveredElem.classList.add('hovered')

}

  moveCursor (landmarks: any) {
    if (this.jitterReduction) {
      if (landmarks[9].x > 0.2 && landmarks[9].x < 0.8) {
        const newCursorX = (window.innerWidth - (landmarks[9].x * window.innerWidth))
        if ((newCursorX > this.cursorX && newCursorX - this.cursorX > this.variance) || (newCursorX < this.cursorX && this.cursorX - newCursorX > this.variance)) this.cursorX = newCursorX
      }
      if (landmarks[9].y > 0.2 && landmarks[9].y < 0.7) {
        const newCursorY = (landmarks[9].y * window.innerHeight)
        if ((newCursorY > this.cursorY && newCursorY - this.cursorY > this.variance) || (newCursorY < this.cursorY && this.cursorY - newCursorY > this.variance)) this.cursorY = newCursorY
      }
    } else {
      if (landmarks[9].x > 0.2 && landmarks[9].x < 0.8) this.cursorX = (window.innerWidth - (landmarks[9].x * window.innerWidth))
      if (landmarks[9].y > 0.2 && landmarks[9].y < 0.7) this.cursorY = (landmarks[9].y * window.innerHeight)
    }
    
    console.log(landmarks[9].x, landmarks[9].y)
    if (this.cursor != null) {
      this.cursor.nativeElement.style.left = `${this.cursorX}px`
      this.cursor.nativeElement.style.top = `${this.cursorY}px`
    }
  }
}
