const imageFileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");
const loadingSpinner = document.querySelector("#loadingSpinner");

let image;


function toggleLoadingSpinner(isLoading) {
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
}


imageFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  

  if (!file || !file.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }

  toggleLoadingSpinner(true);
  
  const imageDataUrl = URL.createObjectURL(file);
  image = new Image();
  image.src = imageDataUrl;

  image.onload = () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
    toggleLoadingSpinner(false);
  };

  image.onerror = () => {
    alert("Error loading image.");
    toggleLoadingSpinner(false);
  };
});


topTextInput.addEventListener("input", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("input", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

// Update canvas with image and text
function updateMemeCanvas(canvas, image, topText, bottomText) {
  if (!image) return;

  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;


  canvas.width = width;
  canvas.height = height;


  ctx.drawImage(image, 0, 0, width, height);


  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;


  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);


  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
}