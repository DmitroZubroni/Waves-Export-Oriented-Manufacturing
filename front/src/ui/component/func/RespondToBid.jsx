import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const RespondToBid = () => {
    const { post } = useContext(AtlantContext);

    const [bidId, setBidId] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryCond, setDeliveryCond] = useState("");
    const [paymentTerms, setPaymentTerms] = useState("");
    const [updatedHash, setUpdatedHash] = useState("");
    const [propose, setPropose] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "respondToBid" },
            { key: "bidId", type: "string", value: bidId },
            { key: "totalCost", type: "string", value: totalCost },
            { key: "deliveryDate", type: "string", value: deliveryDate },
            { key: "deliveryCond", type: "string", value: deliveryCond },
            { key: "paymentTerms", type: "string", value: paymentTerms },
            { key: "updatedHash", type: "string", value: updatedHash },
            { key: "propose", type: "boolean", value: propose === "true" },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>respondToBid</h2>
            <FormControl placeholder="Идентификатор заявки" onChange={(e) => setBidId(e.target.value)} />
            <hr/>
            <FormControl placeholder="Итоговая стоимость" onChange={(e) => setTotalCost(e.target.value)} />
            <hr/>
            <FormControl placeholder="Дата поставки" onChange={(e) => setDeliveryDate(e.target.value)} />
            <hr/>
            <FormControl placeholder="Условия поставки" onChange={(e) => setDeliveryCond(e.target.value)} />
            <hr/>
            <FormControl placeholder="Условия оплаты" onChange={(e) => setPaymentTerms(e.target.value)} />
            <hr/>
            <FormControl placeholder="Обновленный хэш заявки" onChange={(e) => setUpdatedHash(e.target.value)} />
            <hr/>
            <FormControl placeholder="Предложить изменения true или false" onChange={(e) => setPropose(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default RespondToBid;