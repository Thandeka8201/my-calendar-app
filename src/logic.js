function checkSlotAvailability(timeSlot, jobLength, date, availabilityData) {

  // Find the availability for the specified date
  const availability = availabilityData.find(entry => entry.Date === date);

  // If the date is not found in the availability data, return FULL
  if (!availability || !availability.HoursAvailable) {
      return 'FULL';
  }

  // Working hours and buffer constraints
  const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const buffer = 1;
  const currentDateTime = new Date('2016-05-18T11:27:00');
  const currentTime = currentDateTime.getHours();

  // Check if the slot is within the working hours
  if (!workingHours.includes(timeSlot) || timeSlot < currentTime + 2) {
    // Slot is unavailable for two reasons: - either the time entered is not included in the workingHours array, or 
    // The time entered is less than the current time plus buffer time of 2 hours as per functional requirement
      return 'UNAVAILABLE';
  }

  // Check if there is enough buffer before the slot
  const bufferBeforeSlot = timeSlot > 9 ? availability.HoursAvailable.includes(timeSlot - buffer) : true;

  // Check if there is enough consecutive time for the job
  for (let i = 1; i < jobLength; i++) {
      if (!availability.HoursAvailable.includes(timeSlot + i) || timeSlot + i > 17) {
          // Slot is unavailable here for two reasons as per functional requirement: -time entered plus 1 hour buffer is not included in the HoursAvailable data array, Or
          // time entered plus 1 hour buffer is greater than the finishing  hour, 17
          return 'UNAVAILABLE';
      }
  }

  // Return the appropriate status
  // Note that slot is only available when time entered minus buffer before it, is included in the HoursAvailable data array as per functional requiremnts
  return bufferBeforeSlot ? 'AVAILABLE' : 'UNAVAILABLE';
}

// Example JSON data usage for availabilityData
const availabilityData = [
    {"Date": "2016-05-18", "HoursAvailable": [9, 10, 11, 12, 13, 14, 17]},
    {"Date": "2016-05-19", "HoursAvailable": [9, 10, 11, 12, 13, 14, 15, 16, 17]},
    {"Date": "2016-05-20", "HoursAvailable": [9, 10, 14, 15, 16, 17]},
    {"Date": "2016-05-21", "HoursAvailable": [9, 10, 11, 12, 13]},
    {"Date": "2016-05-23", "HoursAvailable": [13, 14, 15, 16]},
    {"Date": "2016-05-24", "HoursAvailable": [11, 12, 15, 16, 17]}
];

//Testing the function
console.log(checkSlotAvailability(12, 1, '2016-05-19', availabilityData));
console.log(checkSlotAvailability(9, 3, '2016-05-19', availabilityData));
console.log(checkSlotAvailability(11, 3, '2016-05-17', availabilityData));
console.log(checkSlotAvailability(13, 2, '2016-05-21', availabilityData)); 
console.log(checkSlotAvailability(15, 1, '2016-05-20', availabilityData));  

export {checkSlotAvailability, availabilityData};