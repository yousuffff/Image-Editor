const filterContainer = document.querySelector(".filters");

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
    filters[filter].unit
  );

  filterContainer.appendChild(filterElement);
});
