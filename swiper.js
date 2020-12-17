class Swiper {
  constructor() {
    this.initialY = null;
    this.initialX = null;

    document.addEventListener("touchstart", (event) => this.startTouch(event));
    document.addEventListener("touchmove", (event) => this.moveTouch(event));

    this.events = {
      swipeUp: new Event("swipeUp"),
      swipdeDown: new Event("swipeDown"),
      swipeLeft: new Event("swipeLeft"),
      swipeRight: new Event("swipeRight"),
    };
  }
  startTouch(event) {
    this.initialX = event.touches[0].clientX;
    this.initialY = event.touches[0].clientY;
  }
  moveTouch(event) {
    if (!this.initialX && !this.initialY) return;

    const currentX = event.touches[0].clientX;
    const currrentY = event.touches[0].clientY;

    const diffX = this.initialX - currentX;
    const diffY = this.initialY - currrentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        document.dispatchEvent(this.events.swipeLeft);
      } else {
        document.dispatchEvent(this.events.swipeRight);
      }
    } else {
      if (diffY > 0) {
        document.dispatchEvent(this.events.swipeUp);
      } else {
        document.dispatchEvent(this.events.swipdeDown);
      }
    }
    this.initialX = null;
    this.initialY = null;
  }
}

new Swiper();
