import { Outlet, useNavigate } from "react-router"
import { useState } from "react"
import axios from "axios"
import MovieComp from "./ShowMovie"
import EditMovieComp from './EditMovie'
import { useSelector } from "react-redux"
import { useLocation } from "react-router";
export default function MoviesPageComp() {

    const location = useLocation()
    const storeData = useSelector(state => state)
    console.log(storeData);
    const navigate = useNavigate()
    const [find, setFind] = useState("")
    const [afterFind, setAfterFind] = useState({})

    function hendleButton(e) {
        navigate(e.target.name)
    }
    async function findMovie() {
        if (location.state != null) {
            { setFind([location.state.movie.name]) }
            let { data } = await axios.get(`http://localhost:8000/other/${find}`)
            setAfterFind(data)
        }
        else {
            let { data } = await axios.get(`http://localhost:8000/other/${find}`)

            setAfterFind(data)
        }
    }


    return <div>
        <h3>Movies</h3>
        <nav>

            <button name="allmovies" onClick={hendleButton} hidden={(storeData.movie)}>All Movies</button>
            <button name="addmovie" onClick={hendleButton} hidden={(storeData.movie)}>Add Movie</button>
            <span hidden={(storeData.movie)}> Find Movie:</span>
            <input type="text" onChange={e => setFind(e.target.value)} hidden={(storeData.movie)}></input>
            <button onClick={findMovie} hidden={(storeData.movie)}>Find</button>

            {find && < MovieComp movie={afterFind} />}
            {storeData.movie && <EditMovieComp />}
            <Outlet />
        </nav>
    </div>
}
