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
    
    let ticketPreview = document.getElementById("ticket-preview");
    let purchaseTicketButton = document.getElementById("purchase-btn");

    purchaseTicketButton.addEventListener("click", prewiewTickets)

    function prewiewTickets () {
        if (Number(numberOfTicketsInput.value) < 1 || seatingPreferenceInput.value == "seating-preference" ||
            !fullNameInput.value  || emailInput.value == "" || phoneNumberInput.value == "")
        {
            return;
        }

        ticketPreview.style.display = "block";

        purchaseNumberTickets.textContent = numberOfTicketsInput.value;
        purchaseSeatingPreference.textContent =  seatingPreferenceInput.value;
        purchaseFullName.textContent = fullNameInput.value;
        purchaseEmail.textContent = emailInput.value;
        purchasePhoneNumber.textContent = phoneNumberInput.value;

        purchaseTicketButton.disabled = true;

        numberOfTicketsInput.value = "";
        seatingPreferenceInput.value = "seating-preference"
        fullNameInput.value = ""
        emailInput.value = ""
        phoneNumberInput.value = ""

    }

}