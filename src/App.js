import React, { useState } from 'react';
import AvailabilityCalendar from './AvailabilityCalendar';
import './styles.css';

const App = () => {
  
  //Set the initial job length
  const initialJobLength = 2;

  //State to hold the selected job length
  const [selectedJobLength, setSelectedJobLength] = useState(initialJobLength);

  //Function to handle slider changes
  const handleSliderChange = (event) => {
    setSelectedJobLength(parseInt(event.target.value, 10));
  }

  return (
    <div>
      <h1>My Availability Calendar</h1>

      {/* Display selected job length dynamically */}
      <p>Selected Job Length: {selectedJobLength} hours</p>

      {/* Slider input with onChange event handler */}
      <input 
        type="range" 
        min="1" 
        max="5" 
        value={selectedJobLength} 
        onChange={handleSliderChange} 
      />
      <AvailabilityCalendar jobLength = {selectedJobLength}/>
      
    </div>
  );
};

export default App;