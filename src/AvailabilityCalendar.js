import React, {useEffect, useState} from "react";
import { checkSlotAvailability } from "./logic";

const AvailabilityCalendar = ({jobLength}) => {

    const [selectedSlots, setSelectedSlots] = useState([]);
    const [availabilityData, setAvailabilityData] = useState([]);

    //Fetch availability data
    useEffect(() => {
        import (`./logic.json`).then(data => {
            setAvailabilityData(data);
        });
    }, []);

    //Function to handle slot click
    const handleSlotClick = (time, date) => {
        const result = checkSlotAvailability(time, jobLength, date, availabilityData);

        if(result === 'AVAILABLE'){
            const updatedSelectedSlots = [...selectedSlots, {time, date}];
            setSelectedSlots(updatedSelectedSlots);
        }
    };

    //Function to render slots based on availability and selected state
    const renderSlots = () => {
        return availabilityData.map(({Date, HoursAvailable}) => (
            <div key={Date}>
                <h3>Date</h3>
                {HoursAvailable.map(hour => {
                    const result = checkSlotAvailability(hour, jobLength, Date, availabilityData);
                    const isSelected = selectedSlots.some(slot => slot.time === hour && slot.date === Date);

                    return(
                        <div
                        key = {hour}
                        className = {`availability-slot ${result.toLowerCase()}`}
                        /*{result === 'FULL' ? 'Full' : result === 'UNAVAILABLE' ? 'Unavailable' : isSelected ? 'Selected' : 'Available'}*/
                        onClick ={() => handleSlotClick(hour, Date)} 
                        >
                        {hour}:00 - {result === 'AVAILABLE' && isSelected ? 'Selected' : result}
                        </div>
                    );
                })}
            </div>
        ));
    };

    return(
        <div className="availability-slot">
           {/*Render slots*/}
           {renderSlots()}
        </div>
    );
};

export default AvailabilityCalendar;