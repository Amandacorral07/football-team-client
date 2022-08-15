import { Form,Button } from 'react-bootstrap'

const TeamForm = (props) => {
    const { team, handleChange, handleSubmit, heading } = props

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
                placeholder="What is your team's name?"
                name="name"
                id="name"
                value={ team.name }
                onChange={ handleChange }
            />
            <Form.Label htmlFor="type">Type</Form.Label>
            <Form.Control
                placeholder="Input 'team'"
                name="type"
                id="type"
                value={ team.type }
                onChange={ handleChange }
            />
            <Form.Label htmlFor="wins">Number of Wins</Form.Label>
            <Form.Control
                placeholder="How many wins?"
                type="number"
                name="numberOfWins"
                id="numberOfWins"
                value={ team.numberOfWins }
                onChange={ handleChange }
            />
            <Form.Label htmlFor="losses">Number of Losses</Form.Label>
            <Form.Control
               placeholder="How many losses?"
               type="number"
               name="numberOfLosses"
               id="numberOfLosses"
               value={ team.numberOfLosses }
               onChange={ handleChange }
            />
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default TeamForm