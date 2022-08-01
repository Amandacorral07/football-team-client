import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllTeams } from '../../api/teams'
import messages from '../shared/AutoDismissAlert/messages'

// TeamsIndex should make a request to the api
// To get all teams
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const TeamsIndex = (props) => {
    const [teams, setTeams] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in TeamsIndex', props)

    useEffect(() => {
        console.log(props)
        getAllTeams()
            .then(res => setTeams(res.data.teams))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Teams',
                    message: messages.getTeamsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If teams haven't been loaded yet, show a loading message
    if (!teams) {
        return <LoadingScreen />
    } else if (teams.length === 0) {
        return <p>No teams yet. Better add some.</p>
    }

    const teamCards = teams.map(team => (
        <Card style={{ width: '30%', margin: 5}} key={ team.id }>
            <Card.Header>{ team.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/teams/${team.id}`}>View { team.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { teamCards }
        </div>
    )
}

export default TeamsIndex