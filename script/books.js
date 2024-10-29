
document.addEventListener("DOMContentLoaded", function () {
    const roomType = document.querySelector("select[name='roomType']");
    const priceDisplay = document.getElementById("price-display");

    const roomPrices = {
        single: 10000,
        double: 15000,
        suite: 25000,
    };

    roomType.addEventListener("change", function () {
        const selectedRoom = roomType.value;
        if (roomPrices[selectedRoom]) {
            priceDisplay.innerText = `Құны: ${roomPrices[selectedRoom]} KZT`;
        } else {
            priceDisplay.innerText = "Құны: -";
        }
    });
});

 

document.addEventListener("DOMContentLoaded", function () {
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const today = new Date().toISOString().split('T')[0];

    checkinInput.setAttribute('min', today);

    checkinInput.addEventListener("change", function () {
        const checkinDate = new Date(checkinInput.value);

        checkoutInput.setAttribute('min', checkinInput.value);

        if (checkoutInput.value) {
            const checkoutDate = new Date(checkoutInput.value);
            if (checkoutDate <= checkinDate) {
                checkoutInput.value = '';
                alert("Кету күні келу күнінен кейін болуы керек.");
            }
        }
    });

    checkoutInput.addEventListener("change", function () {
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);

        if (checkoutDate <= checkinDate) {
            alert("Кету күні келу күнінен кейін болуы керек.");
            checkoutInput.value = '';
        }
    });
});
