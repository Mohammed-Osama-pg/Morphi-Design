const portWrapper = document.querySelector(".wrapper");
const imgsHolderSwepper = document.querySelector(".imgs-holder");
const portArrowBtn = document.querySelectorAll(".wrapper ion-icon");
const imgHolderChildren = [...imgsHolderSwepper.children];
let firstCardWidth = imgsHolderSwepper.querySelector(".port-card").offsetWidth;
let isDragging = false,
  startX,
  startScrollleft,
  timeoutId;

//   Get the number of cards that can fit in the imgSwepper at once
let imgPerView = Math.round(imgsHolderSwepper.offsetWidth / firstCardWidth);

// Inser copies of the last few cards to beginning of imgSwepper for infinite scrolling
// imgHolderChildren
//   .slice(-imgPerView)
//   .reverse()
//   .forEach((img) => {
//     imgsHolderSwepper.insertAdjacentHTML("afterbegin", img.outerHTML);
//   });

// Inser copies of the last few cards to end of imgSwepper for infinite scrolling
// imgHolderChildren.slice(0, imgPerView).forEach((img) => {
//   imgsHolderSwepper.insertAdjacentHTML("beforeend", img.outerHTML);
// });

portArrowBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    imgsHolderSwepper.scrollLeft +=
      btn.id === "left-arrow" ? -firstCardWidth : firstCardWidth;
  });
});

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

// const InfiniteScroll = () => {
//   // if the imgSwepper is at the beginning,scroll to the end
//   if (imgsHolderSwepper.scrollLeft === 0) {
//     imgsHolderSwepper.classList.add("no-animation");
//     imgsHolderSwepper.scrollLeft =
//       imgsHolderSwepper.scrollWidth - 2 * imgsHolderSwepper.offsetWidth;
//     imgsHolderSwepper.classList.remove("no-animation");
//   }
//   // if the imgSwepper is at the end,scroll to the beginning
//   else if (
//     imgsHolderSwepper.scrollLeft ===
//     imgsHolderSwepper.scrollWidth - imgsHolderSwepper.offsetWidth
//   ) {
//     imgsHolderSwepper.classList.add("no-animation");
//     imgsHolderSwepper.scrollLeft = imgsHolderSwepper.offsetWidth;
//     imgsHolderSwepper.classList.remove("no-animation");
//   }
//   // Clear exisiting timeout & start autoplay if mouse is not hovering over imgSwepper
//   clearTimeout(timeoutId);
//   if (!portWrapper.matches(":hover")) autoPlay();
// };

const autoPlay = () => {
  if (window.innerWidth < 800) return; // Return if window is smaller than 800
  // Autoplay the imgSwepper after every 2500 ms
  timeoutId = setTimeout(
    () => (imgsHolderSwepper.scrollLeft += firstCardWidth),
    2500
  );
};
autoPlay();

imgsHolderSwepper.addEventListener("mousedown", dragStart);
imgsHolderSwepper.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
// imgsHolderSwepper.addEventListener("scroll", InfiniteScroll);
portWrapper.addEventListener("mouseenter", clearTimeout(timeoutId));
portWrapper.addEventListener("mouseleave", autoPlay);
