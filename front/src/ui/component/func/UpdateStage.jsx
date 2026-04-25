import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const UpdateStage = () => {
    const { post } = useContext(AtlantContext);

    const [bidId, setBidId] = useState("");
    const [stageStatus, setStageStatus] = useState("");
    const [stageHash, setStageHash] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "updateStage" },
            { key: "bidId", type: "string", value: bidId },
            { key: "stageStatus", type: "string", value: stageStatus },
            { key: "stageHash", type: "string", value: stageHash },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>updateStage</h2>
            <FormControl placeholder="Идентификатор заявки" onChange={(e) => setBidId(e.target.value)} />
            <hr/>
            <FormControl placeholder="Статус этапа" onChange={(e) => setStageStatus(e.target.value)} />
            <hr/>
            <FormControl placeholder="Хэш документа этапа" onChange={(e) => setStageHash(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default UpdateStage;