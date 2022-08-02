import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneTeam, updateTeam, removeTeam } from '../../api/teams'
import messages from '../shared/AutoDismissAlert/messages'
import EditTeamModal from './EditTeamModal'
// import NewToyModal from '../toys/NewToyModal'
// import ShowToy from '../toys/ShowToy'

// We need to get the team's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the toy cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowTeam = (props) => {
    const [team, setTeam] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    // const [toyModalShow, setToyModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the team in showTeam', team)
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
    }, [updated])

    // here we'll declare a function that runs which will remove the team
    // this function's promise chain should send a message, and then go somewhere
    const removeTheTeam = () => {
        removeTeam(user, team.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeTeamSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing team',
                    message: messages.removeTeamFailure,
                    variant: 'danger'
                })
            })
    }

    if (!team) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ team.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Number Of Wins: { team.numberOfWins }</small></div>
                            <div><small>Number Of Losses: { team.numberOfLosses }</small></div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowTeam