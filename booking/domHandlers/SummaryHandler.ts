// Suponiendo que estos son los datos de la reserva
const bookingSummary = {
    vehicleName: "Toyota Corolla o similar",
    pickupDate: "2023-01-01",
    pickupTime: "10:00 AM",
    returnDate: "2023-01-05",
    returnTime: "10:00 AM",
    pickupLocation: "Aeropuerto Internacional",
    returnLocation: "Aeropuerto Internacional"
};

// Función para cargar los datos en el resumen
function loadBookingSummary(summaryData) {
    document.getElementById("summaryDataVehicleName").textContent = summaryData.vehicleName;
    document.getElementById("summaryDataPickupDate").textContent = summaryData.pickupDate;
    document.getElementById("summaryDataPickupTime").textContent = summaryData.pickupTime;
    document.getElementById("summaryDataReturnDate").textContent = summaryData.returnDate;
    document.getElementById("summaryDataReturnTime").textContent = summaryData.returnTime;
    document.getElementById("summaryDataPickupLocation").textContent = summaryData.pickupLocation;
    document.getElementById("summaryDataReturnLocation").textContent = summaryData.returnLocation;
}
