import React from 'react';
import { checkSlotAvailability, availabilityData } from './logic';
import './styles.css';

const AvailabilityTable = ({ date, jobLength }) => {
  const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  
    // Function to get the class name based on availability status
    const getClassName = (availabilityStatus) => {
      switch (availabilityStatus) {
        case 'FULL':
          return 'availability-slot full';
        case 'UNAVAILABLE':
          return 'availability-slot unavailable';
        case 'AVAILABLE':
          return 'availability-slot available';
        default:
          return 'availability-slot selected';
      }
    };
  
    // Generate table rows based on availability data
    const tableRows = workingHours.map((startHour) => {
      const endHour = startHour + 1;
      const availabilityStatus = checkSlotAvailability(startHour, jobLength, date, availabilityData);
      const className = getClassName(availabilityStatus);
  
      return (
        <tr key={startHour}>
          <td>{`${startHour}:00 - ${endHour}:00`}</td>
          <td className={className}>{availabilityStatus}</td>
        </tr>
      );
    });
  
    return (
      <div>
        <h2>Availability Table for {date}</h2>
        <table>
          <thead>
            <tr>
              <th>Time Range</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  };

export default AvailabilityTable;