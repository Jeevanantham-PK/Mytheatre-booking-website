// ==========================================
// THEATRE MOVIE DATA
// ==========================================

const movieSchedule = {

    "03 OCT": [

        {
            name: "Sigma",

            language: "Tamil",

            genre: "Action • Drama",

            rating: "⭐ 8.5",

            timings: [
                "10:30 AM",
                "6:00 PM"
            ]

        },

        {
            name: "Meesaya Murukku 2",

            language: "Tamil",

            genre: "Comedy • Drama • Musical",

            rating: "⭐ 8.3",

            timings: [
                "2:00 PM",
                "9:30 PM"
            ]

        }

    ],


    "04 OCT": [

        {
            name: "Sigma",

            language: "Tamil",

            genre: "Action • Drama",

            rating: "⭐ 8.5",

            timings: [
                "10:30 AM",
                "6:00 PM"
            ]

        },

        {
            name: "Meesaya Murukku 2",

            language: "Tamil",

            genre: "Comedy • Drama • Musical",

            rating: "⭐ 8.3",

            timings: [
                "2:00 PM",
                "9:30 PM"
            ]

        }

    ],


    "05 OCT": [

        {
            name: "Sigma",

            language: "Tamil",

            genre: "Action • Drama",

            rating: "⭐ 8.5",

            timings: [
                "10:30 AM",
                "6:00 PM"
            ]

        },

        {
            name: "Meesaya Murukku 2",

            language: "Tamil",

            genre: "Comedy • Drama • Musical",

            rating: "⭐ 8.3",

            timings: [
                "2:00 PM",
                "9:30 PM"
            ]

        }

    ],


    "06 OCT": [

        {
            name: "Sigma",

            language: "Tamil",

            genre: "Action • Drama",

            rating: "⭐ 8.5",

            timings: [
                "10:30 AM",
                "6:00 PM"
            ]

        },

        {
            name: "Meesaya Murukku 2",

            language: "Tamil",

            genre: "Comedy • Drama • Musical",

            rating: "⭐ 8.3",

            timings: [
                "2:00 PM",
                "9:30 PM"
            ]

        }

    ],


    "07 OCT": [

        {
            name: "Sigma",

            language: "Tamil",

            genre: "Action • Drama",

            rating: "⭐ 8.5",

            timings: [
                "10:30 AM",
                "6:00 PM"
            ]

        },

        {
            name: "Meesaya Murukku 2",

            language: "Tamil",

            genre: "Comedy • Drama • Musical",

            rating: "⭐ 8.3",

            timings: [
                "2:00 PM",
                "9:30 PM"
            ]

        }

    ],


    "08 OCT": [

        {
            name: "Sigma",

            language: "Tamil",

            genre: "Action • Drama",

            rating: "⭐ 8.5",

            timings: [
                "10:30 AM",
                "6:00 PM"
            ]

        },

        {
            name: "Meesaya Murukku 2",

            language: "Tamil",

            genre: "Comedy • Drama • Musical",

            rating: "⭐ 8.3",

            timings: [
                "2:00 PM",
                "9:30 PM"
            ]

        }

    ]

};


// ==========================================
// SELECTED DATE
// ==========================================

let selectedDate = "03 OCT";


// ==========================================
// BROWSE MOVIES
// ==========================================

function goToMovies() {

    document.getElementById("movies")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// DATE SELECTION
// ==========================================

function selectDate(button) {

    const dateButtons =
        document.querySelectorAll(
            ".dates button"
        );


    // Remove previous active date

    dateButtons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    // Activate clicked date

    button.classList.add("active");


    // Get selected date

    selectedDate =
        button.innerText
            .replace(/\s+/g, " ")
            .trim();


    // Update movies

    renderMovies();


    // Scroll to movie section

    document.getElementById("movieContainer")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


// ==========================================
// SHOW MOVIES FOR SELECTED DATE
// ==========================================

function renderMovies() {

    const container =
        document.getElementById(
            "movieContainer"
        );


    container.innerHTML = "";


    const movies =
        movieSchedule[selectedDate] || [];


    // No movie available

    if (movies.length === 0) {

        container.innerHTML = `
            <div class="no-movies">
                <h2>No Movies Available</h2>
                <p>
                    There are no shows available
                    for ${selectedDate}.
                </p>
            </div>
        `;

        return;
    }


    // Create movie cards

    movies.forEach(function(movie) {


        const card =
            document.createElement("div");


        card.className =
            "movie-card";


        // Poster

        const poster =
            document.createElement("div");


        poster.className =
            "poster";


        poster.textContent =
            "🎬";


        // Movie information

        const info =
            document.createElement("div");


        info.className =
            "movie-info";


        info.innerHTML = `

            <h2>
                ${movie.name}
            </h2>

            <p>
                ${movie.rating} | ${movie.language}
            </p>

            <p>
                ${movie.genre}
            </p>

            <h3>
                Show Timings
            </h3>

        `;


        // Timing container

        const times =
            document.createElement("div");


        times.className =
            "times";


        // Create timing buttons

        movie.timings.forEach(
            function(time) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.textContent =
                    time;


                button.onclick =
                    function() {

                        bookTicket(
                            movie.name,
                            time
                        );

                    };


                times.appendChild(
                    button
                );

            }
        );


        info.appendChild(times);


        card.appendChild(poster);

        card.appendChild(info);


        container.appendChild(card);

    });

}


// ==========================================
// BOOK TICKET
// ==========================================

function bookTicket(movie, time) {

    const bookingDetails = {

        movie: movie,

        date: selectedDate,

        time: time

    };


    // Save booking

    localStorage.setItem(
        "bookingDetails",
        JSON.stringify(
            bookingDetails
        )
    );


    // Open seat page

    window.location.href =
        "seats.html";

}


// ==========================================
// LOAD MOVIES WHEN WEBSITE OPENS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderMovies();

    }
);