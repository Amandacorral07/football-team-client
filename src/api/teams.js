import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllTeams = () => {
    return axios(`${apiUrl}/teams`)
}

export const getOneTeam = (id) => {
    return axios(`${apiUrl}/teams/${id}`)
}

export const createTeam = (user, newTeam) => {
	return axios({
		url: apiUrl + '/teams',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			team: newTeam
		},
	})
}


// UPDATE
export const updateTeam = (user, updatedTeam) => {
    // console.log('createTeam in api was hit')
    // in our createTeam form, we're building an object
    // when we pass that object into the api createTeam function,
    // it's going to look like the teams in our database
    // we're going to refer to this as newTeam
    // console.log('this is user', user)
    console.log('this is updatedTeam', updatedTeam)
	return axios({
		url: `${apiUrl}/teams/${updatedTeam.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { team: updatedTeam }
	})
}

// DELETE
export const removeTeam = (user, teamId) => {
    return axios({
        url: `${apiUrl}/teams/${teamId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}