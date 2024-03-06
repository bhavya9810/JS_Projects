const modal = document.getElementById("share-modal");

const overlay = document.getElementsByClassName("close-modal");

console.log(modal);
console.log(overlay);

const openModal = () => {
  console.log("modal is open");
  modal.classList.add("active");
};
