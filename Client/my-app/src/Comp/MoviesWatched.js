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
         let arr=[]
        filterSub.forEach(async s => {
            let {data} = await axios.get(`http://localhost:8000/movies/${s.movieID}`)
            console.log(data);
            let obj = { "name": data.name, "yearPremiered": s.date }
            console.log(obj);
            arr.push(obj)

        })
        setSubs(arr)

    }
    // const getmovies = () => {
    //     return new Promise((resolve) => {
    //         let { data } = axios.get(`http://localhost:8000/subscriptionses`)
    //         let filterSub = data.filter(s => s.memberID === props.id)
    //         let arr = []
    //         filterSub.forEach(s => {
    //             let { data } = axios.get(`http://localhost:8000/movies/${s.movieID}`)
    //             console.log(data);
    //             let obj = { "name": data.name, "yearPremiered": s.date }
    //             console.log(obj);
    //             arr.push(obj)
    //         })
    //         //setSubs(arr)
    //         resolve(arr)
    //     })

    // }

    useEffect(() => {
      //const getM =async()=> {
       //let resp=  await 
       getmovies()
     //  setSubs(resp)
      
      //getM()
       
    }, []);
    return <div>
        Movies Whatched<br />
        <button onClick={e => setSubscribe(!isSubscribe)}>Subscribe to a new Movie</button>
        {isSubscribe && <AddSubscribeComp movies={props.movies} id={props.id} subs={subs} />}

        {
            subs.map((movie, index) => {
                return <div key={index}><Link to={"/menu/moviepage"} state={{ movie: movie }}>{movie.name}</Link>,
                    <span>{movie.yearPremiered}</span>



                </div>
            })}


    </div>
}