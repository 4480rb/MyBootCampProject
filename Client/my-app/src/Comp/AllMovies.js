import axios from "axios";
import { useState, useEffect } from "react";
import MovieComp from "./ShowMovie";

export default function AllMoviesComp() {
    const [movies, setMovies] = useState([])

   
    const getMovies = async () => {
        
         
            let { data } = await axios.get(`http://localhost:8000/movies`)
            setMovies(data)
        
    }
    useEffect(() => {
        getMovies();
    }, []);

    return <div>
        {
            movies && movies.map((movie, index) => {
                return <div key={index}><MovieComp movie={movie} /></div>
            })
        }

    </div>
}