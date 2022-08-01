import TeamsIndex from "./teams/TeamsIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const {msgAlert} = props
	return (
		<>
			<h2>See the Teams</h2>
			<TeamsIndex msgAlert={msgAlert}/>
		</>
	)
}

export default Home
