import { available_languages, default_language } from "@/languages/available_languages"
import { dates_translation } from "./constants"

export function getAge(birthDate, isFormatted = false) {

    if (!isFormatted) {
        birthDate = JSON.parse(birthDate)
        var year = birthDate.year
        var day = birthDate.day
        var month = birthDate.month

        birthDate = `${year}-${month}-${day}`
    }

    return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
}





export function extractDateFromTimestamp(timestamp) {
    const date = new Date(timestamp)
    const current_date = new Date()



    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Reformat the date part
    const year = date.getFullYear();
    const moment_year = current_date.getFullYear();
    const month = formatNumber(date.getMonth() + 1) // Months are zero-indexed in JavaScript
    // const monthName = capitalizeFirstLetter(monthNames.monthNames[date.getMonth()]) // Months are zero-indexed in JavaScript
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const day = formatNumber(date.getDate().toString().padStart(2, '0')); // Ensure two digits

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    const seconds = date.getSeconds()
    const milliseconds = date.getMilliseconds()

    // Format the time into 12-hour format with AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0'); // Convert to 12-hour format and ensure two digits


    // Combine into the final format
    const finalFormattedDate = `${weekday} ${month} ${day} ${year == moment_year ? '' : year} | ${hours}:${minutes}${period}`



    const this_date = `${month}-${day}-${year}`

    return {
        year,
        month,
        day,
        hours,
        minutes,
        seconds,
        milliseconds,
        date: this_date,
        finalFormattedDate,
    }
}



export function timeDifference(timestamp) {
    const now = new Date();
    const targetDate = new Date(timestamp);

    let diff = Math.abs(now - targetDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);

    const seconds = Math.floor(diff / 1000);


    return {
        days,
        hours,
        minutes,
        seconds,
    }
}



export function getTimeWithDateName(timestamp, lang = 'en') {
    const date = timeDifference(timestamp)
    var this_time = ''
    var date_name = ''

    if (date.days > 0) {
        this_time = date.days
        date_name = dates_translation.days[lang]
    }

    else if (date.hours > 0) {
        this_time = date.hours
        date_name = dates_translation.hours[lang]
    }

    else if (date.minutes > 0) {
        this_time = date.minutes
        date_name = dates_translation.minutes[lang]
    }

    else if (date.seconds > 0) {
        this_time = date.seconds
        date_name = dates_translation.seconds[lang]
    }


    return { this_time, date_name }
}


export function formatNumber(number) {
    return number < 10 ? number.toString().padStart(2, '0') : number.toString();
}




export function downloadFile(fullUrl, filename, onStartLoadingFunc = '', onFinishLoadingFunc = '', onErrroLoadingFunc = '') {
    // Start loading animation 
    if (onStartLoadingFunc) {
        onStartLoadingFunc()
    }

    try {

        fetch(fullUrl)
            // check to make sure you didn't have an unexpected failure (may need to check other things here depending on use case / backend)
            .then(resp => resp.status === 200 ? resp.blob() : Promise.reject('something went wrong'))
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                // the filename you want
                a.download = filename
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                // or you know, something with better UX...
                if (onFinishLoadingFunc) {
                    onFinishLoadingFunc()
                } else {
                    alert('your file has downloaded!');
                }
            })
            .catch(() => {
                // Catch an error
                if (onErrroLoadingFunc) {
                    onErrroLoadingFunc()
                } else {
                    alert('oh no!')
                }
            })

    } catch (error) {
        // Catch an error
        if (onErrroLoadingFunc) {
            onErrroLoadingFunc()
        } else {
            alert('oh no!')
        }
    }
}



export function openFileInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}







// Checking if file name is already exist in the valid files 
export function checkIfFileDuplicated(files, uploadedFiles) {
    const file_names__files = files.map(item => item.fileName);
    const file_names__uploadedFiles = uploadedFiles.map(item => item.fileName);

    // Filter array1 items that have matching ids in array2
    const duplicates = uploadedFiles.filter(item => file_names__files.includes(item.fileName));
    const valid_data = files.filter(item => !file_names__uploadedFiles.includes(item.fileName));

    return { valid_data, duplicates }

}




// Remove empty values from an object 
export function removeEmptyValues(obj) {
    // Iterate over the keys of the object
    Object.keys(obj).forEach(key => {
        const value = obj[key]

        // Check if the value is empty
        if (value === null || value === undefined ||
            value === ""
            // ||
            // (Array.isArray(value) && value.length === 0) ||
            // (typeof value == 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
            // ( Object.keys(value).length === 0)
        ) {
            // Delete the key if its value is empty
            // console.log(typeof value == 'object' && !Array.isArray(value))
            delete obj[key]
        }
    })


    return obj
}







export function formatNumberWithCommas(number) {
    // Convert the number to a string
    let numStr = number.toString();

    // Split the number into integer and decimal parts
    let [integerPart, decimalPart] = numStr.split('.');

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer part with the decimal part (if exists)
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}





export function calculateFileSize(size, precision = 2) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    // let size = size
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return size ? `${size.toFixed(precision)} ${units[unitIndex]}` : null
}




export function getLanguageDetails(lang) {
    // const languages = available_languages

    var language = {}

    const this_language = available_languages[lang]

    if (this_language) {
        language = this_language
    } else {
        language = available_languages[default_language.key]
    }

    return language
}





export function calculateArrayOfNumbers(arr) {
    var sum = 0
    if (arr.length > 0) {
        sum = arr.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0)
    }

    return sum
}



export function isAValidString(str) {
    var isValidString = !Number.isNaN(Number(str)) && str.trim() !== ""

    return isValidString
}



export function isValidNumber(value) {

    // Check if the input value is a number and greater than or equal to 0
    const numberValue = parseFloat(value)
    return !isNaN(numberValue) && numberValue >= 0
}




export function isValidPhoneNumber(phoneNumber) {
    // Regular expression to validate phone numbers
    const phoneRegex = /^\+?(\d{1,3})?[-. (]?(\d{1,4})[-. )]?(\d{1,4})[-. ]?(\d{1,9})$/;

    // Test the phone number against the regex
    return phoneRegex.test(phoneNumber)
}




export function isValidEmail(email) {
    // Regular expression to validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email address against the regex
    return emailRegex.test(email);
}


export function isValidPassword(password) {
    // Regular expression to validate the password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Test the password against the regex
    return passwordRegex.test(password);
}




export function cleanText(text) {
    // Replace spaces with underscores, remove numbers and special characters
    return text
        .replace(/\s+/g, '_')     // Replace spaces with underscores
        .replace(/[^a-zA-Z_]/g, '') // Remove numbers and special characters, keep underscores
        .toLowerCase();
}