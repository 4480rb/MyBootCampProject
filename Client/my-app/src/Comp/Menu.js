import { Outlet, useNavigate } from 'react-router-dom'

export default function MenuComp() {
    const navigate = useNavigate()
    function hendleButton(e) {
        navigate(e.target.name)
    }

    return <div>
        <nav>
            <button name="moviepage" onClick={hendleButton }>Movie</button>
            <button name="subscriptionpage" onClick={ hendleButton}>Subscription</button>
            <button name="usermanagementpage" onClick={ hendleButton}>User Management</button>
            <button name="logOut" onClick={ hendleButton}>Log out</button>
        </nav>

        <Outlet />
    </div>

}