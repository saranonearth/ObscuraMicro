import {Row,Col,Card} from 'react-bootstrap';

const Leaderboard = ()=>{
    return(
        <Row>
            <Col xs="12" lg="6">
                <Card className="shadow" id="leaderCard">
                    <Card.Title id="c1">
                        <h3>Current Leaderboard</h3>
                    </Card.Title>
                    <hr />
                    <Card.Body>Player 1</Card.Body>
                    <Card.Body>Player 2</Card.Body>
                    <Card.Body>Player 3</Card.Body>
                </Card>
            </Col>
            <Col xs="12" lg="6">
                <Card className="shadow" id="leaderCard">
                    <Card.Title id="c1">
                        <h3>Previous Winners</h3>
                    </Card.Title>
                    <hr />
                    <Card.Body>Winner 1</Card.Body>
                    <Card.Body>Winner 2</Card.Body>
                    <Card.Body>Winner 3</Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Leaderboard;