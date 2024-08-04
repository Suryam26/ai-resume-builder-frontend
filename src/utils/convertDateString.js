function convertDateString(inputDate) {
    // Split the input string by the hyphen to get the year, month, and day
    const [year, month, day] = inputDate.split('-');

    // Create a new Date object using the year, month, and day
    const date = new Date(year, month - 1, day);

    // Format the date to "MMM YYYY"
    const options = { month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export default convertDateString;
