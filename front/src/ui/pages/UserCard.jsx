import {Table, Card, FormControl, Col, Row, Container} from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import {useContext, useEffect, useState} from "react";

const UserCard = () => {
    const { contractId } = useContext(AtlantContext);
    const [data, setData] = useState([]);
    const [role, setRole] = useState("");
    const [wallet, setWallet] = useState("");

    useEffect(() => {
        (async () => {
            fetch(`http://localhost:6882/contracts/${contractId}`)
                .then(res => res.json())
                .then(setData)
        })()
    }, [contractId])

    return (
        <div>
            <Header />

            <div className="container">
                <h2>найти определённого пользователя</h2>

                    <FormControl
                        placeholder="key"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />

                    <FormControl
                        placeholder="value"
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                    />

                <Container>
                    <Row>
                        {data
                            .filter(i => i.key.includes(role) && i.value.includes(wallet))
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

export default UserCard;