// ---- Trail tips: button click updates visible text (requirement 1) ----

const trailTips = [
  "Move slower than feels natural — most birds notice you before you notice them.",
  "Overcast mornings carry sound further, so listen before you look.",
  "A hunched silhouette in a bare tree is often a raptor, not a leaf.",
  "Note the flight pattern, not just the color — it narrows things down fast.",
  "Pishing softly can draw curious songbirds out of dense cover.",
  "The first and last hour of daylight are usually the most active."
];

let currentTipIndex = -1;

const tipText = document.getElementById("tip-text");
const tipButton = document.getElementById("tip-button");

function showNextTip() {
  let nextIndex = Math.floor(Math.random() * trailTips.length);

  // Avoid showing the same tip twice in a row when there's more than one.
  if (trailTips.length > 1) {
    while (nextIndex === currentTipIndex) {
      nextIndex = Math.floor(Math.random() * trailTips.length);
    }
  }

  currentTipIndex = nextIndex;
  tipText.textContent = trailTips[nextIndex];
}

tipButton.addEventListener("click", showNextTip);

// ---- Margin meter: live style change while typing (requirement 2) ----

const speciesInput = document.getElementById("species-input");
const meterFill = document.getElementById("meter-fill");
const MAX_MARGIN_CHARS = 40;

function updateMeter() {
  const charCount = speciesInput.value.length;
  const fillPercent = Math.min(charCount / MAX_MARGIN_CHARS, 1) * 100;

  meterFill.style.width = fillPercent + "%";

  if (fillPercent < 40) {
    meterFill.style.backgroundColor = "rgb(32, 39, 229)"; // moss
  } else if (fillPercent < 75) {
    meterFill.style.backgroundColor = "rgb(200, 10, 35)"; // ochre
  } else {
    meterFill.style.backgroundColor = "rgb(216, 31, 198)"; // rust
  }
}

speciesInput.addEventListener("input", updateMeter);

// ---- Sighting log: add and remove list items (requirement 3) ----

const timeInput = document.getElementById("time-input");
const addButton = document.getElementById("add-button");
const sightingList = document.getElementById("sighting-list");
const emptyMessage = document.getElementById("empty-message");

function updateEmptyMessage() {
  const hasSightings = sightingList.children.length > 0;
  emptyMessage.classList.toggle("is-hidden", hasSightings);
}

function addSighting() {
  const species = speciesInput.value.trim();
  const time = timeInput.value.trim();

  if (species === "") {
    speciesInput.focus();
    return;
  }

  const listItem = document.createElement("li");
  listItem.className = "sighting-item";

  const textWrapper = document.createElement("span");
  textWrapper.className = "sighting-item__text";

  const speciesSpan = document.createElement("span");
  speciesSpan.className = "sighting-item__species";
  speciesSpan.textContent = species;
  textWrapper.appendChild(speciesSpan);

  if (time !== "") {
    const timeSpan = document.createElement("span");
    timeSpan.className = "sighting-item__time";
    timeSpan.textContent = time;
    textWrapper.appendChild(timeSpan);
  }

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    listItem.remove();
    updateEmptyMessage();
  });

  listItem.appendChild(textWrapper);
  listItem.appendChild(removeButton);
  sightingList.appendChild(listItem);

  speciesInput.value = "";
  timeInput.value = "";
  updateMeter();
  speciesInput.focus();
  updateEmptyMessage();
}

addButton.addEventListener("click", addSighting);

// Enter key on either field also logs the sighting.
speciesInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addSighting();
  }
});

timeInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addSighting();
  }
});

// Set the initial state on load.
updateEmptyMessage();
