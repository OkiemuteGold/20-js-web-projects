const container = document.getElementById("seat_container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const movieSelect = document.getElementById("movie");

const count = document.getElementById("count");
const totalPrice = document.getElementById("total_price");
const pluralizeSeat = document.getElementById("plural_seat");

updateUI();

let ticketPrice = +(movieSelect.value);

/* save selectedIndex and total price */
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
};

/* update count and total price */
/* use parseInt, or Number or add + before to change string to number */
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    /* save selectedSeats by index */
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    totalPrice.innerText = selectedSeatsCount * ticketPrice;
};

function updateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            };
        });
    };
    
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    // const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
    // if (selectedMovieIndex !== null || selectedMoviePrice !== null) {

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;

        // count.innerText = selectedSeats.length;
        // totalPrice.innerText = selectedSeats.length * selectedMoviePrice;
    }
}

/* movie select event listener */
movieSelect.addEventListener("change", (e) => {
    ticketPrice = parseInt(e.target.value);

    movieIndex = e.target.selectedIndex;
    setMovieData(movieIndex, ticketPrice);

    updateSelectedCount();
});

// seats.forEach(seat => {
// seat.addEventListener("click", function() {
//     this.classList.toggle("selected")
// })
// });

/* seat event listener and attribute update */
/* best performance than adding click listener to seat as above */
container.addEventListener("click", (e) => {
    let seat = e.target;

    seats.forEach(seat => {
        seat.setAttribute("aria-label", "add seat");
    });

    if (seat.classList.contains("seat") && !(seat.classList.contains("occupied"))) {
        seat.classList.toggle("selected");

        updateSelectedCount();

        seat.classList.contains("selected") ?
            seat.setAttribute("aria-label", "remove seat") :
            seat.setAttribute("aria-label", "add seat");
    }
});

/* calling the function to update count and totalPrice ON PAGE LOAD... can be achieved by also getting the selectedMoviePrice from local storage and setting count and total price as above */
updateSelectedCount();