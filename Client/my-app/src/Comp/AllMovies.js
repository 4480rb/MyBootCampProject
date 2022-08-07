import axios from "axios";
import { useState, useEffect } from "react";
import MovieComp from "./ShowMovie";
import { useLocation } from "react-router";
export default function AllMoviesComp() {
    const [movies, setMovies] = useState([])
    let location = useLocation()
    const getMovies = async () => {
        if (location.state !== null) {
           let { data } = await axios.get(`http://localhost:8000/movies/y/${location.state.movie.name}`)
           setMovies([data])
        }
        else {
            let { data } = await axios.get(`http://localhost:8000/movies`)
            setMovies(data)

        }
    }

    useEffect(() => {
        getMovies();
    }, [movies]);

    const filterMovies = async (movie) => {
        let { data } = await axios.delete(`http://localhost:8000/movies/z/${movie._id}`)
        if (data === "Movie deleted👌") {
            const temp = movies.filter(mv => mv._id !== movie._id)
            setMovies([...temp])
            alert(data)
        }
    }

    return <div>

        {
            movies && movies.map((movie, index) => {
                return <div key={index}><MovieComp movie={movie} callback={(movie) => filterMovies(movie)} /></div>
            })
        }

    </div>
}