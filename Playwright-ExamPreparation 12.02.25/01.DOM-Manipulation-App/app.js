window.addEventListener('load', solve);

function solve() {
    
    let carModelInput = document.getElementById("car-model");
    let carYearInput = document.getElementById("car-year");
    let partNameInput = document.getElementById("part-name");
    let partNumber = document.getElementById("part-number");
    let carCondition = document.getElementById("condition"); 

    let infoCarModel = document.getElementById("info-car-model");
    let infoCarYear = document.getElementById("info-car-year");
    let infoPartName = document.getElementById("info-part-name");
    let infoPartNumber = document.getElementById("info-part-number");
    let infoConditon = document.getElementById("info-condition");

    let partInfo = document.getElementById("part-info");
    let confirmOrder = document.getElementById("confirm-order");

    let nextButton = document.getElementById("next-btn");
    nextButton.addEventListener("click", onNext)

    function onNext(e) {
        e.preventDefault();
        let carYearValue = Number(carYearInput.value);
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();

        if(carModelInput.value == "" || partNameInput.value == "" || partNumber.value == "" ||
        carCondition.value == "" || carYearValue < 1990 || carYearValue > currentYear)
        {
            return;
        }
        
        infoCarModel.textContent = carModelInput.value;
        infoCarYear.textContent = carYearInput.value;
        infoPartName.textContent = partNameInput.value;
        infoPartNumber.textContent = partNumber.value;
        infoConditon.textContent = carCondition.value;

        partInfo.style.display = "block";
        nextButton.disabled = true;

        carModelInput.value = "";
        carYearInput.value = "";
        partNameInput.value = "";
        partNumber.value = "";
        carCondition.value = "";
    };

    let editButton = document.getElementById("edit-btn");
    editButton.addEventListener("click", onEdit);

    function onEdit() {
        carModelInput.value = infoCarModel.textContent;
        carYearInput.value = infoCarYear.textContent;
        partNameInput.value = infoPartName.textContent;
        partNumber.value = infoPartNumber.textContent;
        carCondition.value = infoConditon.textContent;

        partInfo.style.display = "none";
        nextButton.disabled = false;
    }

    let confirmButton = document.getElementById("confirm-btn");
    confirmButton.addEventListener("click", onConfirm)

    function onConfirm() {
        partInfo.style.display = "none"
        confirmOrder.style.display = "block"
    }

    let newOrderButton = document.getElementById("new-btn");
    newOrderButton.addEventListener("click", onNewOrder);

    function onNewOrder () {
        confirmOrder.style.display = "none";
        nextButton.disabled = false;
    }

};


    
    
