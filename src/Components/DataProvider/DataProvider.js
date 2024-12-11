import React, { createContext, useReducer } from 'react';
import { initialState } from '../../Utility/reducer'; // Assuming this is where your state is defined

export const DataContext = createContext();

export const DataProvider = ({ children, reducer }) => {
    return (
        <DataContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </DataContext.Provider>
    );
};

