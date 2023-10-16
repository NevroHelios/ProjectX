const track = document.getElementById("image-track");
const slideFriction = 1;

let scrollValue = 0;
const modalContainer = document.getElementById("modal-container");
const modalContent = document.getElementById("modal-content");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

for (const image of track.getElementsByClassName("image")) {
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

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`
        },
        {
            duration: 1200,
            fill: "forwards"
        }
    );

    for (const image of track.getElementsByClassName("image")) {
        image.animate(
            {
                objectPosition: `${nextPercentage + 100}% 50%`
            },
            {
                duration: 1200,
                fill: "forwards"
            }
        );
    }
});

window.onmousedown = (e) => {
    track.dataset.mouseDownAt = e.clientX;
};

const image = document.querySelector('.image');

image.addEventListener('mouseenter', () => {
  image.classList.remove('desaturated');
});

image.addEventListener('mouseleave', () => {
  image.classList.add('desaturated');
});


window.onmousemove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth * slideFriction;

    const percentage = -(mouseDelta / maxDelta) * 100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`
        },
        {
            duration: 1200,
            fill: "forwards"
        }
    );

    for (const image of track.getElementsByClassName("image")) {
        image.animate(
            {
                objectPosition: `${nextPercentage + 100}% 50%`
            },
            {
                duration: 1200,
                fill: "forwards"
            }
        );
    }
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = 0;
    track.dataset.prevPercentage = track.dataset.percentage;
};
