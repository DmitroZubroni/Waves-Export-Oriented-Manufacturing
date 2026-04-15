import { Button, Table, Card } from "react-bootstrap";
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
                    <Card >
                        <Card.Header></Card.Header>
                        <Table>
                            <tbody>
                            {data
                                .map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <pre>{JSON.stringify(JSON.parse(item.value), null, 2).replace(/[{}"]/g, "")}

                                            </pre>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>

            </div>

        </div>
    );
};

export default BlockchainState;