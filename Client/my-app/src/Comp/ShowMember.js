import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import MoviesWatchedComp from './MoviesWatched';


export default function MemberComp(props) {


    let navigate = useNavigate();
    const dispatch = useDispatch();
   
    function editMember(e) {
        sessionStorage.setItem("id", e.target.name)
        dispatch({ type: "EDIT-MEMBER", payload: true })
        navigate(-1)
    }
    return <div style={{ border: "3px solid black" }}>
        <p> {props.member.name}<br />
            {props.member.email}<br />
            {props.member.city}</p>


        <button name={props.member._id} onClick={editMember}>Edit</button>
        <button >Delete</button><br />
        <MoviesWatchedComp movies={props.movies} id={props.member._id} />


    </div>
}