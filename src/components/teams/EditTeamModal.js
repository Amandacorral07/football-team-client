import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import TeamForm from '../shared/TeamForm'
import { updateTeamSuccess, updateTeamFailure } from '../shared/AutoDismissAlert/messages'

const EditTeamModal = (props) => {
    const { 
        user, show, handleClose, 
        updateTeam, msgAlert, triggerRefresh
    } = props

    const [team, setTeam] = useState(props.team)

    console.log('team in edit modal', team)

    const handleChange = (e) => {
        setTeam(prevTeam => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
                updatedValue = false
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

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateTeam(user, team)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateTeamSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showTeam component
            // updated is in ShowTeam's useEffect's dependency array
            // changes to the updated boolean cause ShowTeam's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateTeamFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <TeamForm 
                    team={team}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Team"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditTeamModal