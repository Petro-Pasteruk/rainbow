$(document).ready(function() {

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

    // Validation toggle step
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
        function nextStep (item, index) {
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

                nextStep(item, index);
            } else {
                errorValidation(item);
            }
        } else if (index === 1) {
            let validationCheckbox = checkCheckedItem(".stepTwo-checkbox");

            if (validationCheckbox > 0) {
                nextStep(item, index);
            } else {
                errorValidation(item);
            }
        } else if (index === 2) {
            let validationCheckbox = checkCheckedItem(".threeStep-checkbox");

            if (validationCheckbox > 0 && document.querySelector("#color").value.length > 3) {
                nextStep(item, index);
            } else {
                errorValidation(item);
            }
        } else if (index === 3) {
            let validationCheckbox = checkCheckedItem(".fourStep-checkbox");

            if (validationCheckbox > 0 && document.querySelector("#bg").value.length > 3 && document.querySelector("#text").value.length > 3) {
                nextStep(item, index);
            } else {
                errorValidation(item);
            }
        } else if (index === 4)  {
            let validationCheckbox = checkCheckedItem(".fiveStep-checkbox");

            if (validationCheckbox > 0) {
                nextStep(item, index);
            } else {
                errorValidation(item);
            }
        } else if (index === 5) {
            let validationCheckbox = checkCheckedItem(".sixthStep-checkbox");

            if (validationCheckbox > 0 && +$("#numberSets").val() > 0) {
                nextStep(item, index);
            } else {
                errorValidation(item);
            }
        } else if (index === 6) {
            let validationCheckbox = checkCheckedItem(".seventhStep-checkbox");

            if (validationCheckbox > 0) {
                nextStep(item, index);
            } else {
                errorValidation(item);
            }
        } else if (index === 7) {
            let validationCheckbox = checkCheckedItem(".eighthStep-checkbox");

            if (validationCheckbox > 0) {
                nextStep(item, index);
                loadSelectedData();
            } else {
                errorValidation(item);
            }
        } else if (index === 8) {
            let
                regName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
                regEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            if ($("#userPhone").val().length === 16 && regEmail.test($("#userEmail").val()) && regName.test($("#userName").val())) {
                nextStep(item, index);
            } else {
                this.classList.add("disabled");
                setTimeout(() => { this.classList.remove("disabled"); }, 3000)
            }
        } else if (index === 9) {
            sendToMail();
            nextStep(item, index);
        }
    }

    // Added functionality to the set counter
    $(".Number_buttonLeft__1WiiT").on("click", function () {
        $("#numberSets").val(+$("#numberSets").val() - 1 + "");
    });
    $(".Number_buttonRight__1SR-n").on("click", function () {
        $("#numberSets").val(+$("#numberSets").val() + 1 + "");
    });

    // Toggle price
    let
        currentPrice = 0,
        price = 0;

    function togglePrice (price) {
        let allPriceDiv = document.querySelectorAll(".CalculatorPage_priceOutput__2Bptx");

        allPriceDiv.forEach(item => {
            item.textContent = price + " ₽";
        });
        document.querySelector(".form_total").textContent = "Общая стоимость - " + price + " руб.";
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

    const data = {
        construction: {
            id: "#construction",
            selected: [],
            toEmail: []
        },
        design: {
            id: "#design",
            selected: [],
            toEmail: []
        },
        banner: {
            id: "#banner",
            selected: []
        },
        inventory: {
            id: "#inventory",
            selected: []
        },
        sweetSet: {
            id: "#sweetSet",
            selected: []
        },
        program: {
            id: "#program",
            selected: []
        },
        additionally: {
            id: "#additionally",
            selected: []
        }
    };
    function addPriceItems (itemClass, key) {
        document.querySelectorAll(itemClass).forEach(item => {
            item.addEventListener("click", function () {
                if (this.checked) {
                    let
                        priceItem = this.parentElement.querySelector(".radio_price").textContent,
                        textItem = this.parentElement.querySelector(".Radio_label__3vCql").textContent;
                    currentPrice = +priceItem.substr(0, priceItem.length-4);
                    price += currentPrice;
                    togglePrice(price);

                    let text = textItem.substr(0, textItem.length-100).trim() + " - " + currentPrice + " руб. \n";
                    data[key]["selected"].push(text);

                    if (key === "sweetSet") {
                        $("#numberSets").val(+$("#numberSets").val()+1)
                    }
                    if (key === "construction" || key === "design") {
                        let toEmail = textItem.substr(0, textItem.length-100).trim();
                        data[key]["toEmail"].push(toEmail);
                    }
                } else {
                    let
                        priceItem = this.parentElement.querySelector(".radio_price").textContent,
                        textItem = this.parentElement.querySelector(".Radio_label__3vCql").textContent;;
                    currentPrice = +priceItem.substr(0, priceItem.length-4);
                    if (price > 0) {
                        price -= currentPrice;
                    }
                    togglePrice(price);

                    let text = textItem.substr(0, textItem.length-100).trim() + " - " + currentPrice + " руб. \n";
                    data[key]["selected"].forEach((item, index) => {
                        if (item === text) {
                            data[key]["selected"][index] = null;
                        }
                    });


                    if (key === "construction" || key === "design") {
                        let toEmail = textItem.substr(0, textItem.length-100).trim();
                        data[key]["toEmail"].forEach((item, index) => {
                            if (item === toEmail) {
                                data[key]["toEmail"][index] = null;
                            }
                        });
                    }

                    if (key === "sweetSet") {
                        $("#numberSets").val(+$("#numberSets").val()-1)
                    }
                }
            });
        });
    }

    addPriceItems(".stepTwo-checkbox", "construction");
    addPriceItems(".threeStep-checkbox", "design");
    addPriceItems(".fourStep-checkbox", "banner");
    addPriceItems(".fiveStep-checkbox", "inventory");
    addPriceItems(".sixthStep-checkbox", "sweetSet");
    addPriceItems(".seventhStep-checkbox", "program");
    addPriceItems(".eighthStep-checkbox", "additionally");

    function loadSelectedData () {
        for (let key in data) {

            if (data[key]["selected"].length >= 1) {
                data[key]["selected"].forEach(itemToLoad => {
                    if (itemToLoad !== null) {
                        document.querySelector(data[key].id).parentElement.classList.remove("hidden");
                        document.querySelector(data[key].id).textContent = document.querySelector(data[key].id).textContent + "\n" + itemToLoad;
                    }
                });
            }
        }
    }

    // Add mask
    $('#time').mask('99:99');
    $('#data').mask('99.99.9999');
    $("#userPhone").mask("+7(999)999-99-99");

    function sendToMail () {
        let
            price = document.querySelector(".CalculatorPage_priceOutput__2Bptx").textContent,
            construction = fillingToSending("construction"),
            design = fillingToSending("design"),
            countSets = $("#numberSets").val(),
            comments = $("#comments").val().trim(),
            address = $("#address").val(),
            date = $("#data").val(),
            time = $("#time").val(),
            delivery = "",
            name = $("#userName").val().trim(),
            email = $("#userEmail").val().trim(),
            phone = $("#userPhone").val().trim();

        function fillingToSending (key) {
            let variable = "";
            if (data[key]["toEmail"].length > 1) {
                data[key]["toEmail"].forEach(item => {
                    if (item !== null) {
                        if (variable !== "") {
                            variable = variable + ", " + item;
                        } else {
                            variable = item;
                        }
                    }
                });
            }

            return variable;
        }

        if ($("#delivery").prop("checked")) {
            delivery = "Да";
        } else {
            delivery = "Нет";
        }

        $.ajax({
            url: 'send.php',
            type: 'POST',
            dataType: 'json',
            data: {
                price: price,
                construction: construction,
                design: design,
                countSets: countSets,
                comments: comments,
                address: address,
                date: date,
                time: time,
                delivery: delivery,
                name: name,
                email: email,
                phone: phone
            }
        });
    }
});