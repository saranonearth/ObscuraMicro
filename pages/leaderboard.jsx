import {Row,Col,Card,Table} from 'react-bootstrap';

const Leaderboard = ()=>{
    return(
        <Row>
            <Col xs="12" lg="6">
                <Card className="shadow" id="leaderCard">
                    <Card.Title id="c1">
                        <h3>Current Leaderboard</h3>
                    </Card.Title>
                    <hr />
                    <Table borderless hover>
                        <thead>
                            <tr>
                                <th>SNo.</th>
                                <th>Player</th>
                                <th>Questions</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>fusionmaster7</td>
                                <td>2</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>saranoearth</td>
                                <td>2</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Col>
            <Col>
                <Card className="shadow" id="leaderCard">
                    <Card.Title id="c1">
                        <h3>Previous Winners</h3>
                    </Card.Title>
                    <hr />
                    <Table borderless hover>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Player</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>fusionmaster7</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </Row>
    );
};

export default Leaderboard;