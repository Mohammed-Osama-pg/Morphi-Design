const imgsHolderSwepper = document.querySelector(".imgs-holder");
const portArrowBtn = document.querySelectorAll(".wrapper ion-icon");
let firstCardWidth = imgsHolderSwepper.querySelector(".port-card").offsetWidth;

portArrowBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    imgsHolderSwepper.scrollLeft +=
      btn.id === "left-arrow" ? -firstCardWidth : firstCardWidth;
  });
});

let isDragging = false,
  startX,
  startScrollleft;

const dragStart = (e) => {
  isDragging = true;
  imgsHolderSwepper.classList.add("dragging");
  // Records the intial cursor and scroll positono of the img_holder
  startX = e.pageX;
  startScrollleft = imgsHolderSwepper.scrollLeft;
};

const dragStop = () => {
  isDragging = false;
  imgsHolderSwepper.classList.remove("dragging");
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return form here
  // update the scrooll position of the carouel based on the cursor movment
  imgsHolderSwepper.scrollLeft = startScrollleft - (e.pageX - startX);
};

imgsHolderSwepper.addEventListener("mousedown", dragStart);
imgsHolderSwepper.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
