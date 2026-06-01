window.addEventListener("load", solve);

function solve() {
    let numberOfTicketsInput = document.getElementById("num-tickets");
    let seatingPreferenceInput = document.getElementById("seating-preference");
    let fullNameInput = document.getElementById("full-name");
    let emailInput = document.getElementById("email");
    let phoneNumberInput = document.getElementById("phone-number");

    let purchaseTicketButton = document.getElementById("purchase-btn");

    purchaseTicketButton.addEventListener("click", printValues)

    function printValues () {
        console.log(numberOfTicketsInput.value);
        console.log(seatingPreferenceInput.value);
        console.log(fullNameInput.value);
        console.log(emailInput.value);
        console.log(phoneNumberInput.value);
    }

}