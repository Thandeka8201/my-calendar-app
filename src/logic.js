//Import the provided JSON data statically
const availabilityData = require('./logic.json');

function checkSlotAvailability(time, jobLength, date, availability){

    const currentTime = new Date('2016-05-18T11:27:00')
    const currentDay = currentTime.toISOString().split('T')[0];

    //Find availability for the given date
    const dateAvailability = availability || availabilityData.find(entry => entry.Date === date);

    if(!dateAvailability){
        //If no availability data for the date, the slot is FULL
        return 'FULL';
    }

    //Define working hours and buffer times
    const workingHours =  [9,10,11,12,13,14,15,16,17];
    const bufferBefore = 1;
    const bufferForCurrentDay = 2;

    //Calculate the end time for the current day
    const dayEndTime = workingHours[workingHours.length - 1];

    //Check if the provided timeslot is within working hours
    if(time < dayEndTime || time + jobLength > dayEndTime){
        return 'FULL';
    }

    //Check if the slot is on the current day
    const isCurrentDay = date === currentDay;
    const buffer = isCurrentDay ? bufferForCurrentDay : bufferBefore;

    //Check if there is enough buffer before the slot
    if(time - currentTime.getHours() < buffer){
        return 'UNAVAILABLE';
    }

    //Check if there is enough buffer after the slot
    if(time + jobLength < dayEndTime - buffer){
        return 'AVAILABLE';
    }

    //Check if the job runs over to a slot that is FULL
    for(let i = time; i < time + jobLength; i++){
        if(!dateAvailability.HoursAvailable.includes(i)){
            return 'UNAVAILABLE';
        }
    }

    //If none of the above conditions are met, the slot is AVAILABLE
    return 'AVAILABLE';
}

//Testing the function
const result = checkSlotAvailability(9, 1, '2016-05-20', [9, 10, 14, 15, 16, 17]);
console.log(result);

export {checkSlotAvailability};