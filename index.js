document.addEventListener("DOMContentLoaded", function () {
  const scroller = new Scroller("#root");
  document.addEventListener("wheel", (event) => scroller.listenScroll(event));
  document.addEventListener("swipeUp", () => scroller.scroll(1));
  document.addEventListener("swipeDown", () => scroller.scroll(-1));
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 40:
        return scroller.scroll(1);
        break;
      case 38:
        return scroller.scroll(-1);
        break;
      default:
        return;
    }
  });
});
