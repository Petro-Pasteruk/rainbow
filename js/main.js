

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

function validationStep (item, index) {
    function checkCheckedItem (itemClass) {
        let
            allCheckbox = document.querySelectorAll(itemClass),
            validationCheckbox = 0;
        allCheckbox.forEach(item => {
            if (item.checked) {
                validationCheckbox++;
            }
        });

        return validationCheckbox;
    }
    function funcNextStep (item, index) {
        item.classList.add("hidden");
        for (let i = 0; i < allStep.length; i++) {
            if (i === index + 1) {
                allStep[i].classList.remove("hidden");
            }
        }
    }
    function errorValidation (item) {
        item.querySelector(".nextBtn").classList.add("disabled");
        setTimeout(() => { item.querySelector(".nextBtn").classList.remove("disabled"); }, 3000)
    }

    if (index === 0) {
        let reg = /^[а-яА-Я0-9,\.\s]+$/;
        if (document.querySelector("#time").value.length === 5
            && document.querySelector("#data").value.length === 10
            && reg.test(document.querySelector("#address").value)) {

            funcNextStep(item, index);
        } else {
            errorValidation(item);
        }
    } else if (index === 1) {
        let validationCheckbox = checkCheckedItem(".stepTwo-checkbox");

        if (validationCheckbox > 0) {
            funcNextStep(item, index);
        } else {
            errorValidation(item);
        }
    } else if (index === 2) {
        let validationCheckbox = checkCheckedItem(".threeStep-checkbox");

        if (validationCheckbox > 0 && document.querySelector("#color").value.length > 3) {
            funcNextStep(item, index);
        } else {
            errorValidation(item);
        }
    } else if (index === 3) {
        let validationCheckbox = checkCheckedItem(".fourStep-checkbox");

        if (validationCheckbox > 0 && document.querySelector("#bg").value.length > 3 && document.querySelector("#text").value.length > 3) {
            funcNextStep(item, index);
        } else {
            errorValidation(item);
        }
    } else if (index === 4)  {
        let validationCheckbox = checkCheckedItem(".fiveStep-checkbox");

        if (validationCheckbox > 0) {
            funcNextStep(item, index);
        } else {
            errorValidation(item);
        }
    } else if (index === 5) {
        let validationCheckbox = checkCheckedItem(".sixthStep-checkbox");

        if (validationCheckbox > 0 && +$("#numberSets").val() > 0) {
            funcNextStep(item, index);
        } else {
            errorValidation(item);
        }
    } else if (index === 6) {
        let validationCheckbox = checkCheckedItem(".seventhStep-checkbox");

        if (validationCheckbox > 0) {
            funcNextStep(item, index);
        } else {
            errorValidation(item);
        }
    } else if (index === 7) {
        let validationCheckbox = checkCheckedItem(".eighthStep-checkbox");

        if (validationCheckbox > 0) {
            funcNextStep(item, index);
        } else {
            errorValidation(item);
        }
    }
}

// Added functionality to the set counter
$(".Number_buttonLeft__1WiiT").on("click", function () {
    $("#numberSets").val(+$("#numberSets").val() - 1 + "");
});
$(".Number_buttonRight__1SR-n").on("click", function () {
    $("#numberSets").val(+$("#numberSets").val() + 1 + "");
});


let
    currentPrice = 0,
    price = 0;

function togglePrice (price) {
    let allPriceDiv = document.querySelectorAll(".CalculatorPage_priceOutput__2Bptx");

    allPriceDiv.forEach(item => {
        item.textContent = price + " ₽";
    });
    $(".form_total").val("Общая стоимость - " + price + " руб.");
}

$("#delivery").on("click", function () {
    if ($("#delivery").prop("checked")) {
        currentPrice = 2000;
        price += currentPrice;
        togglePrice(price);
    } else {
        currentPrice = 2000;
        if (price > 0) {
            price -= currentPrice;
        }
        togglePrice(price);
    }
});

function addPriceItems (itemClass) {
    document.querySelectorAll(itemClass).forEach(item => {
        item.addEventListener("click", function () {
            if (this.checked) {
                let priceItem = this.parentElement.querySelector(".radio_price").textContent;
                currentPrice = +priceItem.substr(0, priceItem.length-4);
                price += currentPrice;
                togglePrice(price);
            } else {
                let priceItem = this.parentElement.querySelector(".radio_price").textContent;
                currentPrice = +priceItem.substr(0, priceItem.length-4);
                if (price > 0) {
                    price -= currentPrice;
                }
                togglePrice(price);
            }
        });
    });
}

addPriceItems(".stepTwo-checkbox");
addPriceItems(".threeStep-checkbox");
addPriceItems(".fourStep-checkbox");
addPriceItems(".fiveStep-checkbox");
addPriceItems(".sixthStep-checkbox");
addPriceItems(".seventhStep-checkbox");
addPriceItems(".eighthStep-checkbox");