
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import WhatchedComp from './ShowWhatched'
import axios from 'axios'
import { useEffect, useState } from 'react'


export default function MovieComp(props) {
    const [watched, setWatched] = useState([])
    let navigate = useNavigate();
    const dispatch = useDispatch();

    function editMovie(e) {
        sessionStorage.setItem("name", e.target.name)
        dispatch({ type: "EDIT-MOVIE", payload: true })
        navigate(-1)
    }

    const getSubs = async () => {
        let { data } = await axios.get(`http://localhost:8000/subscriptionses/${props.movie._id}`)
        const subToShow = await Promise.all(data.map(sub => getFinalSub(sub)))
        setWatched(subToShow)
    }

    const getFinalSub = async (sub) => {
        const { data } = await axios.get(`http://localhost:8000/members/${sub.memberID}`)
        return { "name": data.name, "date": sub.date }
    }
    useEffect(() => {
        getSubs()
    }, [watched])


    let genres = props.movie.genres;
    return <div style={{ border: "4px solid black" }}>

        <h3>{`${props.movie.name} , ${props.movie.yearPremiered}`}</h3>
        Genres: {genres && `"${genres[0]}", "${genres[1]}", "${genres[2]}"`}
        <br />
        {/* <img src={props.movie.imageUrl} width="50px" height="100px" alt=""></img><br /> */}

       <button name={props.movie.name} onClick={editMovie}  hidden={props.find}>Edit</button>
        <button onClick={() => props.callback(props.movie)} hidden={props.find}>Delete</button>
       {!props.find&& < WhatchedComp watched={watched} />}
    </div>
}