import { Link } from 'react-router-dom'

export default function WhatchedComp(props) {

    return <div style={{ border: "4px solid lightblue" }}>

        subscription watched:
        {props.watched && props.watched.map((watche, index) => {

            return <div key={index}>
                <span><Link to={`/menu/subscriptionpage/allmembers`}>{watche.name}</Link>{watche.date}</span><br />


            </div>

        })}

    </div>
}