import React, { useEffect, useState } from "react"
import { useContext } from 'react'


export const API_URL = `http://www.omdbapi.com/?apikey=3f7547d7`;
const AppContext = React.createContext()
const AppProvider = ({children})=>{
    const [isLoading , setIsLoading] = useState(true)
    const [movie , setMovie] = useState([])
    const [isError , setIsError] = useState({show: "false" , msg: ""})
    const [query , setQuery ] = useState("avengers");

    const getMovies = async (url) => {
        setIsLoading(true)
        try{
            const res = await fetch(url);
            const data = await res.json();
                console.log(data);
            if(data.Response === 'True'){
                setIsLoading(false);
                setIsError({
                    show : false,
                    msg : ""
                })
                setMovie(data.Search)
            }   
            else {
                setIsError({
                    show : true,
                    msg : data.Error
                })
            } 

        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
       let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 1000);
         return ()=> clearTimeout(timerOut)
    } , [query])
    return <AppContext.Provider value={{isError , isLoading , movie , setQuery , query}}>
        {children}
    </AppContext.Provider>

}
const useGlobalContext = ()=>{
    return useContext (AppContext)
  }

export { AppContext , AppProvider , useGlobalContext};