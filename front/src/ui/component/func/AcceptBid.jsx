import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const AcceptBid = () => {
    const { post } = useContext(AtlantContext);

    const [bidId, setBidId] = useState("");
    const [stageHash, setStageHash] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "acceptBid" },
            { key: "bidId", type: "string", value: bidId },
            { key: "stageHash", type: "string", value: stageHash },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>acceptBid</h2>
            <FormControl placeholder="Идентификатор заявки" onChange={(e) => setBidId(e.target.value)} />
            <hr/>
            <FormControl placeholder="Хэш этапа" onChange={(e) => setStageHash(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default AcceptBid;