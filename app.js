const filterContainer = document.querySelector(".filters");
const imageInput = document.querySelector("#image-input");
const imgCanvas = document.querySelector("#img-canvas");
const canvasCtx = imgCanvas.getContext("2d");

const resetBtn = document.querySelector("#reset");
const downloadBtn = document.querySelector("#download-btn");
let filters = {
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
const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturate: 80,
    "hue-rotate": 10,
    sepia: 30,
  },

  bw: {
    grayscale: 100,
    contrast: 120,
  },

  cool: {
    brightness: 105,
    contrast: 110,
    saturate: 120,
    "hue-rotate": 200,
  },

  warm: {
    brightness: 110,
    contrast: 105,
    saturate: 130,
    "hue-rotate": 20,
  },

  inverted: {
    invert: 100,
  },
  dramatic: {
    brightness: 95,
    contrast: 140,
    saturate: 120,
  },

  faded: {
    brightness: 105,
    contrast: 85,
    saturate: 80,
  },

  retro: {
    brightness: 110,
    contrast: 95,
    saturate: 90,
    sepia: 20,
    "hue-rotate": 5,
  },

  soft: {
    brightness: 108,
    contrast: 90,
    blur: 1,
  },

  sharpPop: {
    contrast: 130,
    saturate: 140,
  },

  matte: {
    brightness: 102,
    contrast: 88,
    saturate: 85,
  },

  night: {
    brightness: 85,
    contrast: 120,
    saturate: 70,
  },

  cyberpunk: {
    brightness: 110,
    contrast: 140,
    saturate: 160,
    "hue-rotate": 220,
  },

  goldenHour: {
    brightness: 115,
    contrast: 105,
    saturate: 135,
    "hue-rotate": 15,
  },

  washed: {
    brightness: 120,
    contrast: 80,
    saturate: 75,
  },

  moody: {
    brightness: 90,
    contrast: 130,
    saturate: 85,
  },

  noir: {
    grayscale: 100,
    contrast: 150,
    brightness: 95,
  },

  pastel: {
    brightness: 112,
    contrast: 90,
    saturate: 110,
  },

  frost: {
    brightness: 105,
    contrast: 115,
    saturate: 90,
    "hue-rotate": 190,
  },

  glow: {
    brightness: 115,
    contrast: 105,
    blur: 1,
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
function createInput() {
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
}
createInput();

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

resetBtn.addEventListener("click", () => {
  Object.keys(filters).forEach((key) => {
    filters[key].value =
      key === "brightness" ||
      key === "contrast" ||
      key === "saturate" ||
      key === "opacity"
        ? 100
        : 0;

    document.getElementById(key).value = filters[key].value;
  });

  applyFilters();
});
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-img.jpg";
  link.href = imgCanvas.toDataURL("image/jpeg", 1);

  link.click();
});
function applyPreset(presetName) {
  const preset = presets[presetName];

  // 1️⃣ Reset all filters to default
  Object.keys(filters).forEach((key) => {
    filters[key].value =
      key === "brightness" ||
      key === "contrast" ||
      key === "saturate" ||
      key === "opacity"
        ? 100
        : 0;
  });

  // 2️⃣ Apply preset values
  Object.keys(preset).forEach((key) => {
    filters[key].value = preset[key];
  });

  // 3️⃣ Update sliders
  Object.keys(filters).forEach((key) => {
    document.getElementById(key).value = filters[key].value;
  });

  applyFilters();
}
