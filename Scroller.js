class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector);
    this.sections = document.querySelectorAll("section");
    const sectionsArr = [...this.sections];
    const visbleSection = sectionsArr.findIndex(this.isScrolledIntoView);

    const currentSectionIndex = sectionsArr.findIndex((elem) =>
      this.isScrolledIntoView(elem)
    );
    this.currentSectionIndex = Math.max(currentSectionIndex, 0);
    this.isThrottled = false;
    // this.isScrolledIntoView(this.sections[0]);
  }
  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = Math.floor(rect.bottom);

    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

    return isVisible;
  }
  listenScroll = (e) => {
    if (this.isThrottled) return;
    this.isThrottled = true;
    console.log(this.isThrottled);
    setTimeout(() => {
      this.isThrottled = false;
    }, 1000);

    const direction = e.wheelDelta < 0 ? 1 : -1;
    this.scroll(direction);
  };
  scroll = (direction) => {
    console.log(direction);
    if (direction === 1) {
      const isLastSection =
        this.currentSectionIndex === this.sections.length - 1;
      if (isLastSection) return;
    } else if (direction === -1) {
      const firstSection = this.currentSectionIndex === 0;
      if (firstSection) return;
    }
    this.currentSectionIndex += direction;
    this.scrollToCurrentSection();
  };
  scrollToCurrentSection = () => {
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
}
