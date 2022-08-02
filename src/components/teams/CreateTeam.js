import { useState } from 'react'
import { createTeam } from '../../api/teams'
import { useNavigate } from 'react-router-dom'
import { createTeamSuccess, createTeamFailure } from '../shared/AutoDismissAlert/messages'
import TeamForm from '../shared/TeamForm'

const CreateTeam = (props) => {
    console.log('these are the props in createTeam\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [team, setTeam] = useState({
        name: '',
        type: '',
        numberOfWins: '',
        numberOfLosses: ''
    })

    console.log('this is team in createTeam', team)

    const handleChange = (e) => {
        setTeam(prevTeam => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }
            const updatedTeam = {
                [updatedName]: updatedValue
            }
            return {
                ...prevTeam,
                ...updatedTeam
            }
        })
    }

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createTeam(user, team)
            // if we're successful, navigate to the show page for the new team
            .then(res => { navigate(`/teams/${res.data.team.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createTeamSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createTeamFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <TeamForm 
            team={ team } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new team!"
        />
    )
}

export default CreateTeam