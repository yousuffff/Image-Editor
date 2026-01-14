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
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  blur: {
    value: 0,
  },
  greyScale: {
    value: 0,
  },
  sepia: {
    value: 0,
  },
  opacity: {
    value: 100,
  },
  invert: {
    value: 0,
  },
};
function inputBuilder(name, value, min, max, unit) {
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = name;
  const input = document.createElement("input");
  input.setAttribute("type", "range");
  div.classList.add("filter");
}
