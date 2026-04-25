import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const ClientRespond = () => {
    const { post } = useContext(AtlantContext);

    const [bidId, setBidId] = useState("");
    const [accept, setAccept] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "clientRespond" },
            { key: "bidId", type: "string", value: bidId },
            { key: "accept", type: "boolean", value: accept === "true" },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>clientRespond</h2>
            <FormControl placeholder="Идентификатор заявки" onChange={(e) => setBidId(e.target.value)} />
            <hr/>
            <FormControl placeholder="Принять условия true или false" onChange={(e) => setAccept(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default ClientRespond;