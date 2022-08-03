import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function AddMovieComp() {
    const [newMovie, setNewMovie] = useState({})
    function handlerInput(e) {
        setNewMovie({ ...newMovie, [e.target.name]: e.target.value })
    }
    const saveToDB = async () => {
        let { data } = await axios.post("http://localhost:8000/movies", newMovie)
        console.log(data);

    }
     let navigate=useNavigate()
    function bakeMovies() {
       navigate('/menu/moviepage/allmovies')
    }


    return <div>
        <br />
        Name: <input name="name" type="text" onChange={handlerInput} /><br />
        Genres: <input name="genres" type="text" onChange={handlerInput} /><br />
        ImageUrl: <input name="yearPremiered" type="text" onChange={handlerInput} /><br />
        Premiered: <input name="imageUrl" type="date" onChange={handlerInput} /><br />
        <button onClick={saveToDB}>Save</button>
        <button onClick={bakeMovies}>Cancel</button>
    </div>

}