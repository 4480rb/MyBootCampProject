import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function AddMemberComp() {
    const [newMember, setNewMember] = useState({})
    function handlerInput(e) {
        setNewMember({ ...newMember, [e.target.name]: e.target.value })
    }
    const saveToDB = async () => {
        if (newMember) {
            let { data } = await axios.post("http://localhost:8000/members", newMember)
            alert(data.msg)
        }
        else {
            alert('Put details to add a user')
        }
    }
    let navigate = useNavigate()
    function bakeMembers() {
        navigate('/menu/subscriptionpage/allmembers')
    }


    return <div>
        <br />
        Name: <input name="name" type="text" onChange={handlerInput} /><br />
        Email: <input name="email" type="text" onChange={handlerInput} /><br />
        City: <input name="city" type="text" onChange={handlerInput} /><br />
        <button onClick={saveToDB}>Save</button>
        <button onClick={bakeMembers}>Cancel</button>
    </div>

}