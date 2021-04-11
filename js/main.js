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
            document.querySelector(item).classList.add("error");
            setTimeout(() => { document.querySelector(item).classList.remove("error") }, 3000)
        }

        if (index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6 || index === 8) {
                nextStep(item, index);
        } else if (index === 7) {
            let reg = /^[а-яА-Я0-9,\.\s]+$/;
            if (document.querySelector("#time").value.length !== 5
                && document.querySelector("#data").value.length !== 10
                && !reg.test(document.querySelector("#address").value)) {
                errorValidation("#time");
                errorValidation("#data");
                errorValidation("#address");
            } else if (document.querySelector("#data").value.length !== 10 && !reg.test(document.querySelector("#address").value)) {
                errorValidation("#data");
                errorValidation("#address");
            } else if (!reg.test(document.querySelector("#address").value) && document.querySelector("#time").value.length !== 5) {
                errorValidation("#address");
                errorValidation("#time");
            } else if (document.querySelector("#time").value.length !== 5 && document.querySelector("#data").value.length !== 10) {
                errorValidation("#data");
                errorValidation("#time");
            } else if (document.querySelector("#time").value.length !== 5) {
                errorValidation("#time");
            } else if (document.querySelector("#data").value.length !== 10) {
                errorValidation("#data");
            } else if (!reg.test(document.querySelector("#address").value)) {
                errorValidation("#address");
            } else {
                loadSelectedData();
                nextStep(item, index);
            }
        } else if (index === 9) {
            let
                regName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
                regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

            if ($("#userPhone").val().length !== 16
                && !regEmail.test($("#userEmail").val())
                && !regName.test($("#userName").val())) {
                errorValidation("#userPhone");
                errorValidation("#userEmail");
                errorValidation("#userName");
                console.log(1);
            } else if (!regEmail.test($("#userEmail").val()) && !regName.test($("#userName").val())) {
                errorValidation("#userEmail");
                errorValidation("#userName");
                console.log(2);
            } else if (!regName.test($("#userName").val()) && $("#userPhone").val().length !== 16) {
                errorValidation("#userName");
                errorValidation("#userPhone");
                console.log(3);
            } else if ($("#userPhone").val().length !== 16 && !regEmail.test($("#userEmail").val())) {
                errorValidation("#userEmail");
                errorValidation("#userPhone");
                console.log(4);
            } else if ($("#userPhone").val().length !== 16) {
                errorValidation("#userPhone");
            } else if (!regEmail.test($("#userEmail").val())) {
                errorValidation("#userEmail");
            } else if (!regName.test($("#userName").val())) {
                errorValidation("#userName");
            } else {
                nextStep(item, index);
                sendToMail();
            }
        }
    }

    // Added functionality to the set counter
    $(".Number_buttonLeft__1WiiT").on("click", function () {
        document.querySelectorAll(".sixthStep-checkbox").forEach(item => {
            if (item.classList.contains("lastClick")) {
                if (+item.value !== 0) {
                    item.value = +item.value - 1;
                    $("#numberSets").val(item.value);
                }
            }
        });
    });
    $(".Number_buttonRight__1SR-n").on("click", function () {
        document.querySelectorAll(".sixthStep-checkbox").forEach(item => {
            if (item.classList.contains("lastClick")) {
                item.value = +item.value + 1;
                $("#numberSets").val(item.value);
            }
        });
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
                        $("#numberSets").val(+item.value);
                        document.querySelectorAll(".sixthStep-checkbox").forEach(i => {
                            i.classList.remove("lastClick");
                        });
                        item.classList.add("lastClick");
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
                        let counter = 0;
                        item.classList.remove("lastClick");
                        document.querySelectorAll(".sixthStep-checkbox").forEach(i => {
                            if (i.checked) {
                                $("#numberSets").val(+i.value);
                                counter--;
                            } else {
                                counter++;
                            }
                        });
                        if (counter === 4) {
                            $("#numberSets").val(0);
                        }
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
            countSets = 0,
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

        document.querySelectorAll(".sixthStep-checkbox").forEach(item => {
            countSets = +countSets + +item.value;
        });

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