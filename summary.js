// ==========================================
// GET BOOKING
// ==========================================

const booking =
    JSON.parse(
        localStorage.getItem(
            "completeBooking"
        )
    );


// ==========================================
// CHECK BOOKING
// ==========================================

if (!booking) {

    alert(
        "Booking details not found."
    );

    window.location.href =
        "index.html";

}


// ==========================================
// DISPLAY BOOKING
// ==========================================

document.getElementById(
    "movieName"
).textContent =
    booking.movie;


document.getElementById(
    "showDate"
).textContent =
    booking.date;


document.getElementById(
    "showTime"
).textContent =
    booking.time;


document.getElementById(
    "selectedSeats"
).textContent =
    booking.seats.join(", ");


document.getElementById(
    "ticketCount"
).textContent =
    booking.ticketCount;


document.getElementById(
    "totalPrice"
).textContent =
    booking.total;


// ==========================================
// CONTINUE
// ==========================================

function continueToMobile() {

    window.location.href =
        "mobile.html";

}