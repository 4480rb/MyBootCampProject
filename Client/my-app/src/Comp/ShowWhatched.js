import { Link } from 'react-router-dom'

export default function WhatchedComp(props) {

    return <div style={{ border: "1.5px solid lightblue" }}>

        subscription watched:
        {/* {console.log(props.watched.length)} */}
        {props.watched && props.watched.map((watche, index) => {

            return <div key={index}>
                <span><Link to={`/menu/subscriptionpage/allmembers`} state={{ watche: watche }}>{watche.name}</Link>{watche.date}</span><br />


            </div>

        })}

    </div>
}