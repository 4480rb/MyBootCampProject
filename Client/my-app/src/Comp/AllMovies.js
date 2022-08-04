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
    }, [movies]);

    const filterMovies = async (movie) => {
        let {data}=await axios.delete(`http://localhost:8000/movies/${movie._id}`)
        if(data==="Movie deleted👌"){
        const temp = movies.filter(mv => mv._id !== movie._id)
        setMovies([...temp])
        alert(data)
    }}
    
    return <div>

        {
            movies && movies.map((movie, index) => {
                return <div key={index}><MovieComp movie={movie} callback={(movie) => filterMovies(movie)} /></div>
            })
        }

    </div>
}