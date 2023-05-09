const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                console.log(seat.classList.add("selected"));
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        console.log(selectedMovieIndex)
    }
}
console.log(populateUI())
    // Movie select event
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});



// Seat click event
container.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("sold")
    ) {
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
});

// code for timer
const showTimes = document.querySelectorAll('#show-times li');
const countdown = document.getElementById('countdown');

function getNextShowTime() {
    const now = new Date();
    const currentHour = now.getHours();

    // Find the next show time
    let nextShowTime = null;
    for (let i = 0; i < showTimes.length; i++) {
        const showTime = showTimes[i].innerText;
        const showHour = parseInt(showTime.split(':')[0]);
        if (showHour > currentHour) {
            nextShowTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), showHour);
            break;
        }
    }

    // If there are no more shows today, get the first show time tomorrow
    if (!nextShowTime) {
        const firstShowTime = showTimes[0].innerText;
        const firstShowHour = parseInt(firstShowTime.split(':')[0]);
        nextShowTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, firstShowHour);
    }

    return nextShowTime.getTime();
}

function updateCountdown() {
    const nextShowTime = getNextShowTime();
    const timeDiff = nextShowTime - new Date().getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    countdown.innerText = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
// validate form

function validateForm() {
    var errorMessage = document.getElementById("error-message");
    if (selectedSeats.length === 0) {
        errorMessage.innerText = "Please select at least one seat.";
        return false;
    }
    errorMessage.innerText = "";
    return true;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial update
updateCountdown();



// Initial count and total set
updateSelectedCount();