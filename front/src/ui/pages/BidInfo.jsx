import { Table, Card } from "react-bootstrap";
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
                <h2>Личный кабинет</h2>

                    <Card Bids>
                        <Table>
                            <tbody>
                            {data
                                .filter(i => i.key.includes("BIDS") && i.value.includes(sender))
                                .map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <pre>{JSON.stringify(JSON.parse(item.value), null, 2).replace(/[{}"]/g, "")}</pre>
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

export default BidInfo;