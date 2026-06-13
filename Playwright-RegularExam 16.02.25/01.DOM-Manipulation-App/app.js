window.addEventListener("load", solve);

function solve() {
    let roomSize = document.getElementById("room-size");
    let preferredTimeSlot = document.getElementById("time-slot");
    let fullName = document.getElementById("full-name");
    let email = document.getElementById("email");
    let phoneNumber = document.getElementById("phone-number");

    let previewRoomSize = document.getElementById("preview-room-size");
    let previewTimeSlot = document.getElementById("preview-time-slot");
    let previewFullName = document.getElementById("preview-full-name");
    let previewEmail = document.getElementById("preview-email");
    let previewPhoneNumber = document.getElementById("preview-phone-number");

    let previewContainer = document.getElementById("preview");
    let bookRoomButton = document.getElementById("book-btn");

    bookRoomButton.addEventListener("click", previewRoom) 

    function previewRoom () {
        if(Number(roomSize.value) < 1 || preferredTimeSlot.value == "" ||
    fullName.value == "" || email.value == "" || phoneNumber.value == "")
        {
            return;
        }

        previewContainer.style.display = "block";

        previewRoomSize.textContent = roomSize.value;
        previewTimeSlot.textContent = preferredTimeSlot.value;
        previewFullName.textContent = fullName.value;
        previewEmail.textContent = email.value;
        previewPhoneNumber.textContent = phoneNumber.value;

        bookRoomButton.disabled = true;

        roomSize.value = "";
        preferredTimeSlot.value = "";
        fullName.value = "";
        email.value = "";
        phoneNumber.value = "";
    }

    let editButton = document.getElementById("edit-btn");
    editButton.addEventListener("click", onEdit);

    function onEdit () {
         roomSize.value = previewRoomSize.textContent;
         preferredTimeSlot.value = previewTimeSlot.textContent;
         fullName.value = previewFullName.textContent;
         email.value = previewEmail.textContent;
         phoneNumber.value = previewPhoneNumber.textContent;

         bookRoomButton.disabled = false;

         previewContainer.style.display = "none";

    }

    let confirmButton = document.getElementById("confirm-btn");
    confirmButton.addEventListener("click", onBuy)

    let confirmationSuccess = document.getElementById("confirmation");

    function onBuy() {
        previewContainer.style.display = "none";

        confirmationSuccess.style.display = "block"
    }

    let backButton = document.getElementById("back-btn");

    backButton.addEventListener("click", onBack);

    function onBack () {
        confirmationSuccess.style.display = "none";

        bookRoomButton.disabled = false;
    }
      
}   

    
  