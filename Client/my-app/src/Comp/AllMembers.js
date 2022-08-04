import axios from "axios";
import { useState, useEffect } from "react";
import MemberComp from "./ShowMember";
export default function AllMembersComp() {
    const [members, setMembers] = useState([])
    const [movies, setMovies] = useState([])

    const getMembers = async () => {
        let { data } = await axios.get(`http://localhost:8000/members`)
        setMembers(data)

    }
    useEffect(() => {
        getMembers();
    }, [members])

    const getMovies = async () => {
        const { data } = await axios.get('http://localhost:8000/movies')
        setMovies(data)
        
    }
    useEffect(() => {
        getMovies();
    }, []);
    const filterMembers = async (member) => {
        let { data } = await axios.delete(`http://localhost:8000/members/${member._id}`)
        if (data === "Member deleted👌") {
            const temp = members.filter(m => m._id !== member._id)
            setMovies([...temp])
            alert(data)
        }
    }

    return <div>
        {
            members.map((member, index) => {
                return <MemberComp key={index} movies={movies} member={member} callback={(member) => filterMembers(member)} />
            })
        }
    </div>
}