import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const MarkDelivered = () => {
    const { post } = useContext(AtlantContext);

    const [bidId, setBidId] = useState("");
    const [deliveryHash, setDeliveryHash] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "markDelivered" },
            { key: "bidId", type: "string", value: bidId },
            { key: "deliveryHash", type: "string", value: deliveryHash },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>markDelivered</h2>
            <FormControl placeholder="Идентификатор заявки" onChange={(e) => setBidId(e.target.value)} />
            <hr/>
            <FormControl placeholder="Хэш доставки" onChange={(e) => setDeliveryHash(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default MarkDelivered;