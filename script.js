//your code here
const imageContainer = document.getElementById("image-container");
const h3 = document.getElementById("h");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const para = document.getElementById("para");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const imageClassNames = ["img1", "img2", "img3", "img4", "img5", "img5-copy"];

shuffleArray(imageClassNames);

let selectedImages = [];
let state = 1;

// Function to handle image click
function handleImageClick(event) {
    if (state === 1 || state === 2) {
        const clickedImage = event.target;

        if (!selectedImages.includes(clickedImage)) {
            selectedImages.push(clickedImage);
            clickedImage.style.border = "3px solid red";

            if (selectedImages.length === 2) {
                state = 3;
                verifyButton.style.display = "inline";
            }
           resetButton.style.display = "inline";
        }
    }
}

function handleResetButtonClick() {
    selectedImages.forEach(image => {
        image.style.border = "none";
    });
    selectedImages = [];
    state = 1;
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
}

function handleVerifyButtonClick() {
    if (selectedImages.length === 2) {
        if (selectedImages[0].classList.value === selectedImages[1].classList.value) {
            para.textContent = "You are a human. Congratulations!";
        } else {
            para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
    }

    selectedImages = [];
    state = 1;
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
}

// Create and append image elements
for (let i = 0; i < imageClassNames.length; i++) {
    const img = document.createElement("img");
    img.classList.add(imageClassNames[i]);
    img.src = `images/${imageClassNames[i]}.png`;
    img.addEventListener("click", handleImageClick);
    imageContainer.appendChild(img);
}

// Add event listeners for buttons
resetButton.addEventListener("click", handleResetButtonClick);
verifyButton.addEventListener("click", handleVerifyButtonClick);