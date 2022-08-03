import { Outlet, useNavigate } from "react-router"
import EditMemberComp from "./EditMember"
import { useSelector } from "react-redux"
export default function SubscriptionsComp() {

    const storeData = useSelector(state => state)
    console.log(storeData.member);
    let navigate = useNavigate()
    function hendleButton(e) {
        navigate(e.target.name)
    }
    return <div>
        <h3>Subscriptions</h3>
        <button name="allmembers" onClick={hendleButton} hidden={(storeData.member)}>All Members</button>
        <button name="addmembers"onClick={hendleButton} hidden={(storeData.member)} >Add Members</button>
        {storeData.member && <EditMemberComp/>}
        <Outlet />
    </div>
}