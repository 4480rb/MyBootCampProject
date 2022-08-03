import axios from "axios";
import { useState, useEffect } from "react";
import MemberComp from "./ShowMember";
import { useLocation } from "react-router";
export default function AllMembersComp() {
    const [members, setMembers] = useState([])
    const [movies, setMovies] = useState([])
    const location= useLocation()
    const getMembers = async () => {
        if(location.state!=null){setMembers([location.state.watche])}
        else{
        let { data } = await axios.get(`http://localhost:8000/members`)
        console.log(data);
        setMembers(data)
       
    }}
    useEffect(() => {
        getMembers();
    }, []);

    const getMovies = async () => {
        const { data } = await axios.get('http://localhost:8000/movies')
        setMovies(data)
        console.log(data);
    }
    useEffect(() => {
        getMovies();
    }, []);


    return <div>
        {
            members.map((member, index) => {
                return <MemberComp key={index}  movies={movies} member={member} />
            })
        }
    </div>
}