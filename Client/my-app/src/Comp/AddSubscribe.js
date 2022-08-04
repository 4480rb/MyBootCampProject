import { useEffect, useState } from "react"
import axios from "axios"
export default function AddSubscribeComp(props) {
  const [newSubscribe, setNewSubscribe] = useState({ memberID: props.id })
  const [movies, setMovies] = useState([])

  const saveSubscribe = async () => {
    let { data } = await axios.post("http://localhost:8000/subscriptionses", newSubscribe)
    props.callback(newSubscribe)

    alert(data.msg)

  }
  const moviesToSubscribe = async () => {
    let { data } = await axios.get(`http://localhost:8000/filter/${props.id}`)
    setMovies(data)
  

  }
  useEffect(()=>{
    moviesToSubscribe()
  },[])

  return <div style={{ border: "red solid 3px" }}>
    <h3> Add a new Movie </h3><br />
    < select style={{ width: "250px", height: "20.5px" }} id="movies" name="movies" size="1" multiple onChange={e => setNewSubscribe({ ...newSubscribe, movieID: e.target.value })}>
      {
       movies.map((movie, index) => {
          return <option key={index} value={movie._id} >
            {movie.name}
          </option>
        })
      }
    </select><br />
    <input type="date" name="date" onChange={e => setNewSubscribe({ ...newSubscribe, date: e.target.value })}></input>
    <button onClick={saveSubscribe}>Subscribe</button>

  </div>
}