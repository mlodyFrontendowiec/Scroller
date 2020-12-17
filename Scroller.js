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
    this.drawNavigation();
  }
  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = Math.floor(rect.bottom);

    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

    return isVisible;
  }
  listenScroll(e) {
    if (this.isThrottled) return;
    this.isThrottled = true;
    setTimeout(() => {
      this.isThrottled = false;
    }, 1000);

    const direction = e.deltaY > 0 ? 1 : -1;
    this.scroll(direction);
  }
  scroll(direction) {
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
  }
  scrollToCurrentSection() {
    this.selectActiveItem();
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  drawNavigation() {
    this.navigatonContainer = document.createElement("aside");
    this.navigatonContainer.setAttribute("class", "scroller__navigation");
    const list = document.createElement("ul");

    this.sections.forEach((section, index) => {
      const listItem = document.createElement("li");
      listItem.addEventListener("click", () => {
        this.currentSectionIndex = index;
        this.scrollToCurrentSection();
      });

      list.appendChild(listItem);
    });
    this.navigatonContainer.appendChild(list);

    document.body.appendChild(this.navigatonContainer);

    this.selectActiveItem();
  }
  selectActiveItem() {
    if (this.navigatonContainer) {
      const navigationItems = document.querySelectorAll("li");
      navigationItems.forEach((item, index) => {
        if (index == this.currentSectionIndex) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  }
}
