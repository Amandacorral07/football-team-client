import { 
    Form,
    Button, 
} from 'react-bootstrap'

const TeamForm = (props) => {
    const { team, handleChange } = props

    return (
        <Form>
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
                name="win"
                id="win"
                value={ team.numberOfWins }
                onChange={ handleChange }
            />
            <Form.Check
                label="How many losses?"
                name="losses"
                defaultChecked={ team.numberOfLosses  }
                onChange={ handleChange }
            />
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default TeamForm