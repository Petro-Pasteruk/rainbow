// Add toggle step
const allStep = document.querySelectorAll(".step");

allStep.forEach((item, index) => {
    if (item.querySelector(".nextBtn")) {
        item.querySelector(".nextBtn").addEventListener("click", function () {
            item.classList.add("hidden");
            for (let i = 0; i < allStep.length; i++) {
                if (i === index + 1) {
                    allStep[i].classList.remove("hidden");
                }
            }
        });
    }

    if (item.querySelector(".prevBtn")) {
        item.querySelector(".prevBtn").addEventListener("click", function () {
            item.classList.add("hidden");
            for (let i = 0; i < allStep.length; i++) {
                if (i === index - 1) {
                    allStep[i].classList.remove("hidden");
                }
            }
        });
    }
});