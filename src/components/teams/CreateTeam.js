import { useState } from 'react'

import TeamForm from '../shared/TeamForm'

const CreateTeam = (props) => {
    const [team, setTeam] = useState({
        name: '',
        type: '',
        numberOfWins: '',
        numberOfLosses: ''
    })

    const handleChange = (e) => {
        setTeam(prevTeam => {
            const updatedValue = e.target.value
            const updatedName = e.target.name
            const updatedTeam = {
                [updatedName]: updatedValue
            }
            return {
                ...prevTeam,
                ...updatedTeam
            }
        })
    }

    return <TeamForm team={ team } handleChange={ handleChange } />
}

export default CreateTeam