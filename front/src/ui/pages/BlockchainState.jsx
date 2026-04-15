import {Button, Table, Card, Row, Col, Container} from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import {useContext, useEffect, useState} from "react";

const BlockchainState = () => {
    const { contractId } = useContext(AtlantContext);
    const [data, setData] = useState([]);



    useEffect(() => {
        (async () => {
            fetch(`http://localhost:6882/contracts/${contractId}`)
                .then(res => res.json())
                .then(setData);
        })()
    },[contractId])



    return (
        <div>
            <Header />
            <div className="container">
                <h2>вся информация из блокчейна</h2>
                <Container >
                    <Row>
                        {data
                            .map((item, index) => {
                            return (
                                <Col key={index}>
                                    <Card className="container" >
                                        <Card.Body>
                                            <Card.Title>
                                                {item.key}
                                            </Card.Title>
                                            <pre>{JSON.stringify(item.value).replace(/[{}"]/g, "")}</pre>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>

            </div>

        </div>
    );
};

export default BlockchainState;