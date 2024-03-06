const countValue = document.querySelector("#counter");

function increment() {
  let value = parseInt(countValue.textContent);
  value = value + 1;
  countValue.textContent = value;
  console.log(value);
}

const decrement = () => {
  let value = parseInt(countValue.textContent);
  value = value - 1;
  countValue.textContent = value;
  console.log(value);
};
