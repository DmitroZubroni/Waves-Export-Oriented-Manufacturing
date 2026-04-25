import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const FinalizeDelivery = () => {
    const { post } = useContext(AtlantContext);

    const [bidId, setBidId] = useState("");
    const [accepted, setAccepted] = useState("");
    const [comment, setComment] = useState("");
    const [commentHash, setCommentHash] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "finalizeDelivery" },
            { key: "bidId", type: "string", value: bidId },
            { key: "accepted", type: "boolean", value: accepted === "true" },
            { key: "comment", type: "string", value: comment },
            { key: "commentHash", type: "string", value: commentHash },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>finalizeDelivery</h2>
            <FormControl placeholder="Идентификатор заявки" onChange={(e) => setBidId(e.target.value)} />
            <hr/>
            <FormControl placeholder="Принята поставка true или false" onChange={(e) => setAccepted(e.target.value)} />
            <hr/>
            <FormControl placeholder="Комментарий" onChange={(e) => setComment(e.target.value)} />
            <hr/>
            <FormControl placeholder="Хэш комментария" onChange={(e) => setCommentHash(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default FinalizeDelivery;