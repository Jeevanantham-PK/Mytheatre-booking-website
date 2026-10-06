// =========================================
// GET BOOKING DETAILS
// =========================================

const bookingDetails =
    JSON.parse(
        localStorage.getItem("bookingDetails")
    );

const selectedSeats =
    JSON.parse(
        localStorage.getItem("selectedSeats")
    ) || [];

const totalPrice =
    Number(
        localStorage.getItem("totalPrice")
    ) || selectedSeats.length * 130;


// =========================================
// DISPLAY BOOKING DETAILS
// =========================================

if (bookingDetails) {

    document.getElementById("movieName").textContent =
        bookingDetails.movie;

    document.getElementById("showDate").textContent =
        bookingDetails.date;

    document.getElementById("showTime").textContent =
        bookingDetails.time;
}


document.getElementById("selectedSeats").textContent =
    selectedSeats.length > 0
        ? selectedSeats.join(", ")
        : "None";


document.getElementById("totalPrice").textContent =
    totalPrice;


// =========================================
// SHOW PAYMENT FORM
// =========================================

function showPaymentForm(method) {

    // Hide all payment forms

    document
        .getElementById("upiForm")
        .classList.remove("show");

    document
        .getElementById("cardForm")
        .classList.remove("show");

    document
        .getElementById("netbankingForm")
        .classList.remove("show");


    // Show selected payment form

    if (method === "upi") {

        document
            .getElementById("upiForm")
            .classList.add("show");
    }


    if (method === "card") {

        document
            .getElementById("cardForm")
            .classList.add("show");
    }


    if (method === "netbanking") {

        document
            .getElementById("netbankingForm")
            .classList.add("show");
    }

}


// =========================================
// MAKE PAYMENT
// =========================================

function makePayment() {

    const selectedMethod =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    // Check payment method

    if (!selectedMethod) {

        alert(
            "Please select a payment method."
        );

        return;
    }


    const method =
        selectedMethod.value;


    // =====================================
    // UPI VALIDATION
    // =====================================

    if (method === "upi") {

        const upi =
            document
                .getElementById("upiId")
                .value
                .trim();


        if (upi === "") {

            alert(
                "Please enter your UPI ID."
            );

            return;
        }


        if (!upi.includes("@")) {

            alert(
                "Please enter a valid UPI ID."
            );

            return;
        }
    }


    // =====================================
    // CARD VALIDATION
    // =====================================

    if (method === "card") {

        const cardNumber =
            document
                .getElementById("cardNumber")
                .value
                .replace(/\s/g, "");

        const expiry =
            document
                .getElementById("expiry")
                .value
                .trim();

        const cvv =
            document
                .getElementById("cvv")
                .value
                .trim();


        if (cardNumber.length !== 16) {

            alert(
                "Please enter a valid 16-digit card number."
            );

            return;
        }


        if (expiry === "") {

            alert(
                "Please enter card expiry."
            );

            return;
        }


        if (cvv.length !== 3) {

            alert(
                "Please enter a valid 3-digit CVV."
            );

            return;
        }
    }


    // =====================================
    // NET BANKING VALIDATION
    // =====================================

    if (method === "netbanking") {

        const bank =
            document
                .getElementById("bank")
                .value;


        if (bank === "") {

            alert(
                "Please select your bank."
            );

            return;
        }
    }


    // =====================================
    // SAVE PAYMENT METHOD
    // =====================================

    localStorage.setItem(
        "paymentMethod",
        method
    );


    // =====================================
    // SHOW CONFIRMATION
    // =====================================

    showConfirmation();
}


// =========================================
// BOOKING CONFIRMATION
// =========================================

function showConfirmation() {

    // Hide payment section

    document
        .querySelector(".payment-card")
        .style.display = "none";


    // Fill confirmation details

    if (bookingDetails) {

        document.getElementById(
            "confirmMovie"
        ).textContent =
            bookingDetails.movie;

        document.getElementById(
            "confirmDate"
        ).textContent =
            bookingDetails.date;

        document.getElementById(
            "confirmTime"
        ).textContent =
            bookingDetails.time;
    }


    document.getElementById(
        "confirmSeats"
    ).textContent =
        selectedSeats.join(", ");


    document.getElementById(
        "confirmAmount"
    ).textContent =
        totalPrice;


    // Show confirmation

    document
        .getElementById("confirmation")
        .classList.add("show");


    // Scroll to confirmation

    document
        .getElementById("confirmation")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// =========================================
// BACK TO MOVIES
// =========================================

function goHome() {

    // Optional cleanup

    localStorage.removeItem(
        "selectedSeats"
    );

    localStorage.removeItem(
        "totalPrice"
    );

    localStorage.removeItem(
        "paymentMethod"
    );


    window.location.href =
        "index.html";
}