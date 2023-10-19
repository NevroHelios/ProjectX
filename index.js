const track = document.getElementById("image-track");
const slideFriction = 1;

let scrollValue = 0;
let isScrolling = false;
let touchStartX = 0;

const modalContainer = document.getElementById("modal-container");
const modalContent = document.getElementById("modal-content");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

// Function to handle hover animation
function handleImageHover(image) {
    image.addEventListener("mouseenter", () => {
        image.style.transition = "transform 0.3s";
        image.style.transform = "rotate(15deg)"; // Adjust the tilt angle as needed
    });

    image.addEventListener("mouseleave", () => {
        image.style.transition = "transform 0.3s";
        image.style.transform = "rotate(0deg)";
    });
}

for (const image of track.getElementsByClassName("image")) {
    // Call the hover animation function
    handleImageHover(image);

    image.addEventListener("click", () => {
        modalImage.src = image.src;
        modalContainer.style.display = "block";
    });
}

closeModal.addEventListener("click", () => {
    modalContainer.style.display = "none";
});

window.addEventListener("wheel", (e) => {
    scrollValue += e.deltaY;
    const maxDelta = window.innerWidth * slideFriction;

    const percentage = (scrollValue / maxDelta) * 90;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -90);

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName("image")) {
        const imagePercentage = nextPercentage + 100;
        image.style.objectPosition = `${imagePercentage}% 50%`;
        image.style.transform = `rotate(${imagePercentage * 0.03}deg)`; // Adjust rotation rate as needed
    }

    isScrolling = true;

    if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
    }

    window.scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 100);
});

window.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

window.addEventListener("touchmove", (e) => {
    const touchDeltaX = touchStartX - e.touches[0].clientX;
    const maxDelta = window.innerWidth * slideFriction;

    const percentage = -(touchDeltaX / maxDelta) * 100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName("image")) {
        const imagePercentage = nextPercentage + 100;
        image.style.objectPosition = `${imagePercentage}% 50%`;
        image.style.transform = `rotate(${imagePercentage * 0.5}deg)`; // Adjust rotation rate as needed
    }
    touchStartX = e.touches[0].clientX;
});

window.onmousedown = (e) => {
    track.dataset.mouseDownAt = e.clientX;
};

window.onmousemove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth * slideFriction;

    const percentage = -(mouseDelta / maxDelta) * 100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName("image")) {
        const imagePercentage = nextPercentage + 100;
        image.style.objectPosition = `${imagePercentage}% 50%`;
        image.style.transform = `rotate(${imagePercentage * 0.5}deg)`; // Adjust rotation rate as needed
    }
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = 0;
    track.dataset.prevPercentage = track.dataset.percentage;

    if (!isScrolling) {
        setTimeout(() => {
            for (const image of track.getElementsByClassName("image")) {
                image.style.transition = "transform 0.3s";
                image.style.transform = "rotate(0deg)";
            }
        }, 100);
    }
};
