import { Table, Card } from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import {useContext, useEffect, useState} from "react";

const UserCard = () => {
    const { contractId } = useContext(AtlantContext);
    const [data, setData] = useState([]);

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
                <h2>Личный кабинет</h2>

                <Card>
                    <Table>
                        <tbody>
                        {data
                            .filter(i => i.key.includes(role) && i.value.includes(wallet)) // тут страницчка дожна принимать эти значение с инпута и после этого отрисовавать страницу
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

export default UserCard;