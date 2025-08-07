// this code generates and returns the current year.
export function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
}

// this code calls the getCurrentYear() function and prints the year as part of a document. 
export function displayYear() {
    const year = getCurrentYear();
    document.getElementById("yearDisplay").textContent = year;
}

export function lastModified() {
    const dateTime = document.lastModified;
    document.getElementById("lastModified").textContent = "last modification: " + dateTime;
}