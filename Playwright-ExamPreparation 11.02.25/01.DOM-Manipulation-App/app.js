window.addEventListener("load", solve);

function solve() {
    let numberOfTicketsInput = document.getElementById("num-tickets");
    let seatingPreferenceInput = document.getElementById("seating-preference");
    let fullNameInput = document.getElementById("full-name");
    let emailInput = document.getElementById("email");
    let phoneNumberInput = document.getElementById("phone-number");

    let purchaseNumberTickets = document.getElementById("purchase-num-tickets");
    let purchaseSeatingPreference = document.getElementById("purchase-seating-preference");
    let purchaseFullName = document.getElementById("purchase-full-name");
    let purchaseEmail = document.getElementById("purchase-email");
    let purchasePhoneNumber = document.getElementById("purchase-phone-number");
    
    
    let purchaseTicketButton = document.getElementById("purchase-btn");

    purchaseTicketButton.addEventListener("click", prewiewTickets)

    function prewiewTickets () {
        if(numberOfTicketsInput.value == "" || seatingPreferenceInput.value == "" ||
            fullNameInput.value == "" || emailInput.value == "" || phoneNumberInput.value == "")
        {
            return;
        }

        purchaseNumberTickets.textContent= numberOfTicketsInput.value;



    }

}