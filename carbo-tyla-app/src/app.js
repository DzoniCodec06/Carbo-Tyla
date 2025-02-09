const f1 = document.getElementById("f1");
const f2 = document.getElementById("f2");
const f3 = document.getElementById("f3");
const f4 = document.getElementById("f4");

const brightnesSlider = document.getElementById("brightness");

const fansImages = document.querySelectorAll(".fan");

const lSwicth = document.getElementById("l-switch");

const motorSliders = document.querySelectorAll(".m-slider");

const lEye = document.getElementById("lEye"); // Image
const rEye = document.getElementById("rEye"); // Image

const lEyeInput = document.getElementById("l-eye-c"); // Input
const rEyeInput = document.getElementById("r-eye-c"); // Input

const lUnderEye = document.getElementById("lUnderEye");
const rUnderEye = document.getElementById("rUnderEye");


lEye.addEventListener("click", () => {
    lEyeInput.click();
})

rEye.addEventListener("click", () => {
    rEyeInput.click();
})

lEyeInput.addEventListener("change", (e) => {
    console.log(e.target.value);
    lUnderEye.style.setProperty("--bgColor", e.target.value);
})

rEyeInput.addEventListener("change", (e) => {
    console.log(e.target.value);
    rUnderEye.style.setProperty("--bgColor", e.target.value);
})


let i = 0;

let rotateAnim = setInterval(() => {
    if (i < 360) i++;
    else i = 0;
    fansImages.forEach(fan => {
        fan.style.rotate = `${i}deg`;
    })
}, 10);

function updateRange() {
    let value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.setProperty('--progress', value + '%');
}

f1.addEventListener("input", updateRange);
f2.addEventListener("input", updateRange);
f3.addEventListener("input", updateRange);
f4.addEventListener("input", updateRange);

brightnesSlider.addEventListener("input", updateRange);

lSwicth.addEventListener("change", e => {
    console.log(lSwicth.checked);

    if (lSwicth.checked == true) {
        motorSliders.forEach(slider => slider.classList.replace("m-slider", "m-slider-0"));
    } else motorSliders.forEach(slider => slider.classList.replace("m-slider-0", "m-slider"));
})