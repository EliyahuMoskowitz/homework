import React from 'react';

function Units ({setUnits}) {
    
        return (
        <select name="" id="units">
            <option value="imperial">Farenheit</option>
            <option value="metric">Celcius</option>
            <option value="kelvin">Kelvin</option>
        </select>
        );
}

export default Units;