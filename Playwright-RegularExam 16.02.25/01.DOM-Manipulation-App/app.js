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
    let bookRoom = document.getElementById("book-btn");

    bookRoom.addEventListener("click", previewRoom) 

    function previewRoom() {
        
    }
}   

    
  