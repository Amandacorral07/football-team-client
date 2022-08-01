import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllTeams = () => {
    return axios(`${apiUrl}/teams`)
}

export const getOneTeam = (id) => {
    return axios(`${apiUrl}/teams/${id}`)
}