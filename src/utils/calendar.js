export const DAYS_IN_A_WEEK = 7;
export const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
};

export const isLeapYear = (year) => {
    return !((year % 4) || (!(year % 100) && (year % 400)))
}

export const getDaysInAMonth = (date) => {
    const month = date.getMonth()
    const year = date.getFullYear()
    const daysInMonth = DAYS_IN_MONTHS[month]

    if (isLeapYear(year) && month === Month.February) {
        return daysInMonth + 1
    } else {
        return daysInMonth
    }
}

export const getDayOfWeek = (date) => {
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0) return 6
    return dayOfWeek - 1
}