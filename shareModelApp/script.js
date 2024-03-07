const openProfile = document.querySelector(".modal");

const overlay = document.querySelector(".overlay-modal");

// console.log(overlay);

const openModal = () => {
  console.log("modal is open");
  openProfile.classList.add("modalActive");
  overlay.classList.add("overlayyActive");
};

function closeModel() {
  console.log("modal is closed");
  openProfile.classList.remove("modalActive");
  overlay.classList.remove("overlayyActive");
}
