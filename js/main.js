// Add toggle step
const allStep = document.querySelectorAll(".step");

allStep.forEach((item, index) => {
    if (item.querySelector(".nextBtn")) {
        item.querySelector(".nextBtn").addEventListener("click", function () {
            validationStep(item, index);
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

// Add mask
$('#time').mask('99:99');
$('#data').mask('99.99.9999');
// #address

function funcNextStep (item, index) {
    item.classList.add("hidden");
    for (let i = 0; i < allStep.length; i++) {
        if (i === index + 1) {
            allStep[i].classList.remove("hidden");
        }
    }
}

function validationStep (item, index) {
    if (index === 0) {
        let reg = /^[а-яА-Я0-9,\.\s]+$/;
        if (document.querySelector("#time").value.length === 5
            && document.querySelector("#data").value.length === 10
            && reg.test(document.querySelector("#address").value)) {

            funcNextStep(item, index);
        } else {
            item.querySelector(".nextBtn").classList.add("disabled");
            setTimeout(() => { item.querySelector(".nextBtn").classList.remove("disabled"); }, 3000)
        }
    } else if (index === 1) {
        let
            allCheckbox = document.querySelectorAll(".stepTwo-checkbox"),
            validationCheckbox = 0;
        allCheckbox.forEach(item => {
            if (item.checked) {
                validationCheckbox++;
            }
        });
        if (validationCheckbox > 0) {
            funcNextStep(item, index);
        } else {
            item.querySelector(".nextBtn").classList.add("disabled");
            setTimeout(() => { item.querySelector(".nextBtn").classList.remove("disabled"); }, 3000)
        }
    } else if (index === 2) {
        let
            allCheckbox = document.querySelectorAll(".threeStep-checkbox"),
            validationCheckbox = 0;
        allCheckbox.forEach(item => {
            if (item.checked) {
                validationCheckbox++;
            }
        });
        if (validationCheckbox > 0 && document.querySelector("#color").value.length > 3) {
            funcNextStep(item, index);
        } else {
            item.querySelector(".nextBtn").classList.add("disabled");
            setTimeout(() => { item.querySelector(".nextBtn").classList.remove("disabled"); }, 3000)
        }
    } else if (index === 3) {
        let
            allCheckbox = document.querySelectorAll(".fourStep-checkbox"),
            validationCheckbox = 0;
        allCheckbox.forEach(item => {
            if (item.checked) {
                validationCheckbox++;
            }
        });

        if (validationCheckbox > 0 && document.querySelector("#bg").value.length > 3 && document.querySelector("#text").value.length > 3) {
            funcNextStep(item, index);
        } else {
            item.querySelector(".nextBtn").classList.add("disabled");
            setTimeout(() => { item.querySelector(".nextBtn").classList.remove("disabled"); }, 3000)
        }
    } else if (index === 4)  {
        let
            allCheckbox = document.querySelectorAll(".fiveStep-checkbox"),
            validationCheckbox = 0;
        allCheckbox.forEach(item => {
            if (item.checked) {
                validationCheckbox++;
            }
        });

        if (validationCheckbox > 0) {
            funcNextStep(item, index);
        } else {
            item.querySelector(".nextBtn").classList.add("disabled");
            setTimeout(() => { item.querySelector(".nextBtn").classList.remove("disabled"); }, 3000)
        }
    }
}