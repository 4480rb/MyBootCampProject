import { useEffect, useState } from "react"
import AddSubscribeComp from "./AddSubscribe"
import axios from "axios";
import { Link } from "react-router-dom";
export default function MoviesWatchedComp(props) {
    const [isSubscribe, setSubscribe] = useState(false)
    const [subs, setSubs] = useState([])


    const getmovies = async () => {
        let { data } = await axios.get(`http://localhost:8000/subscriptionses `)
        let filterSub = data.filter(s => s.memberID === props.id)
        const movieToShow = await Promise.all(filterSub.map(mv => getFinalMovie(mv)))
        setSubs(movieToShow)
    }
    const getFinalMovie = async (mv) => {
        const { data } = await axios.get(`http://localhost:8000/movies/z/${mv.movieID}`)
        return { "name": data.name, "yearPremiered": mv.date }
    }

    useEffect(() => {
        getmovies()
    }, [subs])

    return <div style={{border:"solid 4px pink "}}>
        Movies Whatched<br />

        {
            subs.map((movie, index) => {
                return <div key={index}><Link to={"/menu/moviepage/allmovies"} state={{ movie: movie }}>{movie.name}</Link>,
                    <span>{movie.yearPremiered}</span>



                </div>
            })}
        <button onClick={e => setSubscribe(!isSubscribe)}>Subscribe to a new Movie</button>
        {isSubscribe && <AddSubscribeComp id={props.id} subs={subs} callback={(newSubscribe) => setSubs([...subs, newSubscribe])} />}



    </div>
}