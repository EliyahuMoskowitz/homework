import React from 'react';

export default function ZipInput({ getTheWeather }) {

    return (
        <input placeholder="Zip"
            onBlur={getTheWeather} />
    );
}

// this.onSubmit.bind(this)