// =====================================================
// MY THEATRE - SEAT BOOKING
// =====================================================


// =====================================================
// GET BOOKING INFORMATION
// =====================================================

const bookingData =
    JSON.parse(
        localStorage.getItem("bookingDetails")
    );


// =====================================================
// DISPLAY MOVIE / DATE / TIME
// =====================================================

if (bookingData) {

    document.getElementById("movieName").textContent =
        bookingData.movie;

    document.getElementById("showDate").textContent =
        bookingData.date;

    document.getElementById("showTime").textContent =
        bookingData.time;
}


// =====================================================
// SEAT SETTINGS
// =====================================================

const ticketPrice = 130;

let selectedSeats = [];


// =====================================================
// ROWS
// A TO Z
// =====================================================

const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


// =====================================================
// SEAT LAYOUT
// =====================================================

const seatLayout =
    document.getElementById("seatLayout");


// =====================================================
// DIFFERENT BOOKED SEATS FOR DIFFERENT SHOWS
// =====================================================

const showKey =
    bookingData
        ? bookingData.movie +
          "_" +
          bookingData.date +
          "_" +
          bookingData.time
        : "default";


// =====================================================
// PREDEFINED BOOKED SEATS
// Different show = different booked seats
// =====================================================

const bookedPatterns = {

    "Sigma_03 OCT_10:30 AM":
        ["A2", "A8", "A14", "A20",
         "B4", "C6", "D5", "E7",
         "F4", "G11", "H16", "I3"],

    "Sigma_03 OCT_6:00 PM":
        ["A3", "A9", "A15",
         "B5", "C8", "D12",
         "E6", "F15", "G3",
         "H10", "I17"],

    "Meesaya Murukku 2_03 OCT_2:00 PM":
        ["A4", "A10", "A18",
         "B2", "C5", "D8",
         "E14", "F6", "G12",
         "H3", "I15"],

    "Meesaya Murukku 2_03 OCT_9:30 PM":
        ["A1", "A7", "A16",
         "B6", "C3", "D11",
         "E5", "F13", "G8",
         "H17", "I4"]
};


// Get booked seats for this show

const bookedSeats =
    bookedPatterns[showKey] || [
        "A5",
        "B4",
        "C7",
        "D3",
        "E8",
        "F5",
        "G12",
        "H6"
    ];


// =====================================================
// SOME UNAVAILABLE SEATS
// These are different from booked seats
// =====================================================

const unavailableSeats = [

    "B18",
    "C18",
    "D18",
    "E18",

    "F1",
    "G1",

    "J1",
    "J2",

    "M17",
    "M18",

    "Q1",
    "Q2",

    "V18",
    "W18"
];


// =====================================================
// SECTION TITLES
// =====================================================

const sections = {

    "A": "PLATINUM : ₹130",
    "O": "GOLD : ₹130",
    "W": "SILVER : ₹130"

};


// =====================================================
// CREATE ALL ROWS
// =====================================================

rows.forEach(function(rowLetter) {

    // -----------------------------------------------
    // SECTION TITLE
    // -----------------------------------------------

    if (sections[rowLetter]) {

        const title =
            document.createElement("div");

        title.className =
            "section-title";

        title.textContent =
            sections[rowLetter];

        seatLayout.appendChild(title);
    }


    // -----------------------------------------------
    // CREATE ROW
    // -----------------------------------------------

    const row =
        document.createElement("div");

    row.className =
        "seat-row";


    // =================================================
    // ROW LETTER
    // =================================================

    const rowName =
        document.createElement("span");

    rowName.className =
        "row-name";

    rowName.textContent =
        rowLetter;

    row.appendChild(rowName);


    // =================================================
    // A ROW
    //
    // 20 SEATS
    // NO CENTRE GAP
    // =================================================

    if (rowLetter === "A") {

        row.classList.add("row-a");


        for (
            let number = 1;
            number <= 20;
            number++
        ) {

            createSeat(
                row,
                rowLetter,
                number
            );
        }

    }


    // =================================================
    // B TO Z
    //
    // LEFT  = 1 TO 9
    // GAP
    // RIGHT = 10 TO 18
    // =================================================

    else {

        // ---------------------------------------------
        // LEFT GROUP
        // ---------------------------------------------

        const leftGroup =
            document.createElement("div");

        leftGroup.className =
            "seat-group";


        for (
            let number = 1;
            number <= 9;
            number++
        ) {

            createSeat(
                leftGroup,
                rowLetter,
                number
            );
        }


        row.appendChild(leftGroup);


        // ---------------------------------------------
        // CENTRE WALKING AISLE
        // ---------------------------------------------

        const aisle =
            document.createElement("div");

        aisle.className =
            "seat-aisle";

        row.appendChild(aisle);


        // ---------------------------------------------
        // RIGHT GROUP
        // ---------------------------------------------

        const rightGroup =
            document.createElement("div");

        rightGroup.className =
            "seat-group";


        for (
            let number = 10;
            number <= 18;
            number++
        ) {

            createSeat(
                rightGroup,
                rowLetter,
                number
            );
        }


        row.appendChild(rightGroup);

    }


    // Add complete row

    seatLayout.appendChild(row);

});


// =====================================================
// CREATE ONE SEAT
// =====================================================

function createSeat(
    container,
    rowLetter,
    number
) {

    const seat =
        document.createElement("button");


    // Seat name

    const seatNumber =
        rowLetter + number;


    seat.className =
        "seat available";


    seat.dataset.seat =
        seatNumber;


    seat.textContent =
        number;


    // =================================================
    // BOOKED
    // =================================================

    if (
        bookedSeats.includes(
            seatNumber
        )
    ) {

        seat.classList.remove(
            "available"
        );

        seat.classList.add(
            "booked"
        );
    }


    // =================================================
    // UNAVAILABLE
    // =================================================

    else if (
        unavailableSeats.includes(
            seatNumber
        )
    ) {

        seat.classList.remove(
            "available"
        );

        seat.classList.add(
            "unavailable"
        );
    }


    // =================================================
    // CLICK AVAILABLE SEATS
    // =================================================

    if (
        seat.classList.contains(
            "available"
        )
    ) {

        seat.addEventListener(
            "click",
            function() {

                selectSeat(this);

            }
        );

    }


    container.appendChild(
        seat
    );
}


// =====================================================
// SELECT / UNSELECT SEAT
// =====================================================

function selectSeat(seat) {

    const seatNumber =
        seat.dataset.seat;


    // -----------------------------------------------
    // UNSELECT
    // -----------------------------------------------

    if (
        seat.classList.contains(
            "selected"
        )
    ) {

        seat.classList.remove(
            "selected"
        );

        selectedSeats =
            selectedSeats.filter(
                function(item) {

                    return item !== seatNumber;

                }
            );

    }


    // -----------------------------------------------
    // SELECT
    // -----------------------------------------------

    else {

        seat.classList.add(
            "selected"
        );

        selectedSeats.push(
            seatNumber
        );

    }


    updateSummary();
}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateSummary() {

    const selectedElement =
        document.getElementById(
            "selectedSeats"
        );

    const ticketElement =
        document.getElementById(
            "ticketCount"
        );

    const totalElement =
        document.getElementById(
            "totalPrice"
        );


    // Selected seats

    if (
        selectedSeats.length === 0
    ) {

        selectedElement.textContent =
            "None";

    }
    else {

        selectedElement.textContent =
            selectedSeats.join(", ");

    }


    // Number of tickets

    ticketElement.textContent =
        selectedSeats.length;


    // Total

    const total =
        selectedSeats.length *
        ticketPrice;


    totalElement.textContent =
        total;
}


// =====================================================
// CONTINUE
// =====================================================

function continueBooking() {

    // No seat selected

    if (
        selectedSeats.length === 0
    ) {

        alert(
            "Please select at least one seat."
        );

        return;
    }


    // Save selected seats

    localStorage.setItem(
        "selectedSeats",
        JSON.stringify(
            selectedSeats
        )
    );


    // Save total

    const total =
        selectedSeats.length *
        ticketPrice;


    localStorage.setItem(
        "totalPrice",
        total
    );


    // Go to payment page

    window.location.href =
        "payment.html";
}


// =====================================================
// INITIAL SUMMARY
// =====================================================

updateSummary();