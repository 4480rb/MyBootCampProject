import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
export default function EditMovieComp() {
    const [movie, setMovie] = useState({})
    const getMovie = async () => {
        let { data } = await axios.get(`http://localhost:8000/other/${sessionStorage.getItem("name")}`)
        console.log(data);
        setMovie(data)
    }
    useEffect(() => {

        getMovie();

    }, []);
    function handlerInput(e) {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }
    const updateMovie = async () => {
        let { data } = await axios.put(`http://localhost:8000/movies/${movie._id}`, movie)
        console.log(data);
        alert("the movie update")
    }
    let navigate = useNavigate()
    const dispatch = useDispatch();
    function bakeMovies() {
        dispatch({ type: "EDIT-MOVIE", payload: false })
        navigate('/menu/moviepage/allmovies')
    }

    return <div>
        Edit Movie:{sessionStorage.getItem("name")}<br />
        Name:<input type="text" name="name" value={movie.name} onChange={handlerInput}></input><br />
        Genres:<input type="text" name="genres" value={movie.genres} onChange={handlerInput}></input><br />
        ImageUrl:<input type="text" name="imageUrl" value={movie.imageUrl} onChange={handlerInput}></input><br />
        Premiered:<input type="date" name="yearPremiered" value={movie.yearPremiered} onChange={handlerInput}></input><br />
        <button onClick={updateMovie}>Updated</button>
        <button onClick={bakeMovies}>Cancel</button>

    </div>
}