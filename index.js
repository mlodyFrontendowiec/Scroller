document.addEventListener("DOMContentLoaded", function () {
  console.log("załadowano");
  const rootElement = document.querySelector("#root");
  const sections = document.querySelectorAll("section");

  document.addEventListener("mousewheel", function (e) {
    console.log(e.wheelDelta);
  });

  console.log(sections);
});
