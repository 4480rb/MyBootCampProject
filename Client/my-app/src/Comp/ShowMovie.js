
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
        const arr = [];
        let { data } = await axios.get(`http://localhost:8000/subscriptionses/${props.movie._id}`)
        data.map(async sub => {
            const { data } = await axios.get(`http://localhost:8000/members/${sub.memberID}`)
            const obj = { "name": data.name, "date": sub.date }
            arr.push(obj);
        })
        setWatched(arr)

    };
    useEffect(() => {
        getSubs()
    }, [])

    function deleteMovie() {

    }
    let genres = props.movie.genres;
    return <div style={{ border: "3px solid black" }}>
        
        <h3>{`${props.movie.name} , ${props.movie.yearPremiered}`}</h3>
        Genres: {genres && `"${genres[0]}", "${genres[1]}", "${genres[2]}"`}
        <br />
        {/* <img src={props.movie.imageUrl} width="50px" height="100px" alt=""></img><br /> */}

        <button name={props.movie.name} onClick={editMovie}>Edit</button>
        <button onClick={deleteMovie}>Delete</button>
        {console.log(watched.length)}
       < WhatchedComp watched={watched}/>
    </div>
}