const filterContainer = document.querySelector(".filters");
const imageInput = document.querySelector("#image-input");
const imgCanvas = document.querySelector("#img-canvas");
const canvasCtx = imgCanvas.getContext("2d");
const filters = {
  brightness: {
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
  saturate: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  "hue-rotate": {
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
  grayscale: {
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
const placeHolder = document.querySelector(".placeholder");
let file = null;
let img = null;

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
  // console.log("event fired", e);
  placeHolder.style.display = "none";
  imgCanvas.style.display = "block";
  file = e.target.files[0];
  img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const MAX_WIDTH = 700;
    const MAX_HEIGHT = 500;

    let width = img.width;
    let height = img.height;

    const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);

    width = width * scale;
    height = height * scale;

    imgCanvas.width = width;
    imgCanvas.height = height;

    applyFilters();
  };
});

function applyFilters() {
  const f = filters;

  const filterString = `
    brightness(${f.brightness.value / 100})
    contrast(${f.contrast.value / 100})
    saturate(${f.saturate.value / 100})
    hue-rotate(${f["hue-rotate"].value}deg)
    blur(${f.blur.value}px)
    grayscale(${f.grayscale.value / 100})
    sepia(${f.sepia.value / 100})
    opacity(${f.opacity.value / 100})
    invert(${f.invert.value / 100})
  `;

  canvasCtx.filter = filterString;
  canvasCtx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
  canvasCtx.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height);
}
filterContainer.addEventListener("input", (e) => {
  const filter = e.target.id;
  filters[filter].value = e.target.value;
  applyFilters();
});
