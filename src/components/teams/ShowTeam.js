import { 
    useState,
    useEffect, 
} from 'react'

import { 
    useParams,
    useNavigate 
} from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { 
    Container,
    Card 
} from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneTeam } from '../../api/teams'
import messages from '../shared/AutoDismissAlert/messages'

// We need to get the team's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

const ShowTeam = (props) => {
    const [team, setTeam] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { msgAlert } = props
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneTeam(id)
            .then(res => setTeam(res.data.team))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting team',
                    message: messages.getTeamsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [])

    if (!team) {
        return <LoadingScreen />
    }

    return (
        <Container className="fluid">
            <Card>
                <Card.Header>{ team.fullTitle }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Type: { team.type }</small></div>
                        <div><small>Number Of Wins: { team.numberOfWins }</small></div>
                        <div><small>
                            Number Of Losses: { team.numberOfLosses}
                        </small></div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ShowTeam