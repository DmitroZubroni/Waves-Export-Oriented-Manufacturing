import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { useContext, useEffect, useState } from "react";
import Authorization from "../component/Authorization.jsx";

const UserInfo = () => {
    const { contractId, sender, url } = useContext(AtlantContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!sender || !contractId || !url) return;

        const load = async () => {
                const res = await fetch(`http://localhost:${url}/contracts/${contractId}`);
                const json = await res.json();
                setData(json);
        };

        load();
    }, [contractId, sender, url]);

    return (
        <div>
            <Header />
            {!sender ? (
                <Authorization />
            ) : (
                <Container >
                    <h2 className="container">Личный кабинет</h2>
                    <Row>
                        {data
                            .filter(i => i.value.includes(sender))
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
            )}
        </div>
    );
};

export default UserInfo;