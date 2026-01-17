const filterContainer = document.querySelector(".filters");
const imageInput = document.querySelector("#image-input");
const imgCanvas = document.querySelector("#img-canvas");
const canvasCtx = imgCanvas.getContext("2d");
const filters = {
  brigthness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  exposure: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  greyScale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};
const placeHolder = document.querySelector(".placeholder")

function inputBuilder(name, value, min, max, unit) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.value = value;
  input.min = min;
  input.max = max;
  input.id = name;

  const p = document.createElement("p");
  p.textContent = name;

  div.appendChild(p);
  div.appendChild(input);
  return div;
}
Object.keys(filters).forEach((filter) => {
  const filterElement = inputBuilder(
    filter,
    filters[filter].value,
    filters[filter].min,
    filters[filter].max,
    filters[filter].unit,
  );

  filterContainer.appendChild(filterElement);
});
imageInput.addEventListener("change", (e) => {
  console.log("event fired", e);
  placeHolder.style.display = "none";
  const file = e.target.files[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    imgCanvas.width = img.width;
    imgCanvas.height = img.height
    canvasCtx.drawImage(img, 0, 0);
  };
});
