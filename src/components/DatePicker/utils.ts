export const transformedDate = {
  months: {
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  },
  days: {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  },
  daysAbbreviated: {
    monday: 'Mo',
    tuesday: 'Tu',
    wednesday: 'We',
    thursday: 'Th',
    friday: 'Fr',
    saturday: 'Sa',
    sunday: 'Su',
  },
};

export function monthName(month: number) {
  switch (month) {
  case 0:
    return 'january';
  case 1:
    return 'february';
  case 2:
    return 'march';
  case 3:
    return 'april';
  case 4:
    return 'may';
  case 5:
    return 'june';
  case 6:
    return 'july';
  case 7:
    return 'august';
  case 8:
    return 'september';
  case 9:
    return 'october';
  case 10:
    return 'november';
  case 11:
    return 'december';
  default:
  }
}

export function weekdayName(weekday: number) {
  switch (weekday) {
  case 0:
    return 'sunday';
  case 1:
    return 'monday';
  case 2:
    return 'tuesday';
  case 3:
    return 'wednesday';
  case 4:
    return 'thursday';
  case 5:
    return 'friday';
  case 6:
    return 'saturday';
  default:
  }
}
