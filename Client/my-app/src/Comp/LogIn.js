import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LogInComp() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    function handlerInput(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    async function logIn() {
        let resp = await axios.post('http://localhost:8000/authintications', user)
        if (resp.data === "User exsist") {
            navigate('menu')
        }
        else {
            alert("you need to application to our system and get access")
        }

    }
    return <div>
        User Name: <input type="text" name="userName" onChange={handlerInput}></input><br />
        Password: <input type="password" name="password" onChange={handlerInput}></input><br />
        <button onClick={logIn}>LogIn</button>
        
    </div>
}