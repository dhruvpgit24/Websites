import React, { createContext, useState } from 'react'
export const DataContext = createContext(null);
export const Dataprovider = ({children}) => {
    const[data, setdata] = useState();
    const [name, setname] = useState('');
  return (
    <DataContext.Provider value={{data, setdata, name, setname}}>
        {children}
    </DataContext.Provider>
  )
}
