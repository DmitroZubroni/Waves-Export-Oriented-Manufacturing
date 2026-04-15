import {Table, Card, Col, Row} from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import {useContext, useEffect, useState} from "react";

const BidInfo = () => {
    const { contractId, sender } = useContext(AtlantContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            fetch(`http://localhost:6882/contracts/${contractId}`)
                .then(res => res.json())
                .then(setData)
        })()
    }, [contractId, sender])

    return (
        <div>
            <Header />

            <div className="container">
                <h2>заявки существующие в системе</h2>
                <Row>
                    {data
                        .filter(i => i.key.includes("BIDS"))
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
            </div>

        </div>
    );
};

export default BidInfo;