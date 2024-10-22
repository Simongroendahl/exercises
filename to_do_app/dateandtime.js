const getCurrentTimeDate = () => {
    const currentTimeDate = new Date();

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    let hours = currentTimeDate.getHours();
    const minutes = String(currentTimeDate.getMinutes()).padStart(2, '0');
    const AMPM = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    const currentTime = `${hours}:${minutes}${AMPM}`;
    const currentDate = currentTimeDate.getDate();
    const currentMonth = months[currentTimeDate.getMonth()];
    const currentYear = currentTimeDate.getFullYear();

    document.getElementById("klokkeslaet").innerHTML = currentTime;
    document.getElementById("dato").innerHTML = `${currentDate} ${currentMonth} ${currentYear}`;

    setTimeout(getCurrentTimeDate, 500);
}

getCurrentTimeDate();
