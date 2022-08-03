import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
export default function EditMemberComp(){

    const [member, setMember] = useState({})
    const getMember = async () => {
        let { data } = await axios.get(`http://localhost:8000/members/${sessionStorage.getItem("id")}`)
        console.log(data);
        setMember(data)
    }
    useEffect(() => {

        getMember();

    }, []);
    function handlerInput(e) {
        setMember({ ...member, [e.target.name]: e.target.value })
    }
    const updateMember = async () => {
        let { data } = await axios.put(`http://localhost:8000/members/${member._id}`, member)
        console.log(data);
        alert("the member update")
    }
    let navigate = useNavigate()
    const dispatch = useDispatch();
    function bakeMembers() {
        dispatch({ type: "EDIT-MEMBER", payload: false })
        navigate('/menu/subscriptionpage/allmembers')
    }

  
    return <div>
        Edit member:{member.email}<br />
        Name:<input type="text" name="name" value={member.name} onChange={handlerInput}></input><br />
        Email:<input type="text" name="email" value={member.email} onChange={handlerInput}></input><br />
        City:<input type="text" name="city" value={member.city} onChange={handlerInput}></input><br />
        <button onClick={updateMember}>Updated</button>
        <button onClick={bakeMembers}>Cancel</button>

    </div>
}