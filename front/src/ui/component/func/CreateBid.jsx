import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const CreateBid = () => {
    const { post } = useContext(AtlantContext);

    const [type, setType] = useState("");
    const [targetAddress, setTargetAddress] = useState("");
    const [productName, setProductName] = useState("");
    const [volume, setVolume] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [techReqs, setTechReqs] = useState("");
    const [deliveryCond, setDeliveryCond] = useState("");
    const [address, setAddress] = useState("");
    const [paymentTerms, setPaymentTerms] = useState("");
    const [requestHash, setRequestHash] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "createBid" },
            { key: "type", type: "string", value: type },
            { key: "targetAddress", type: "string", value: targetAddress },
            { key: "productName", type: "string", value: productName },
            { key: "volume", type: "string", value: volume },
            { key: "deliveryDate", type: "string", value: deliveryDate },
            { key: "techReqs", type: "string", value: techReqs },
            { key: "deliveryCond", type: "string", value: deliveryCond },
            { key: "address", type: "string", value: address },
            { key: "paymentTerms", type: "string", value: paymentTerms },
            { key: "requestHash", type: "string", value: requestHash },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>createBid</h2>
            <FormControl placeholder="Тип заявки PRODUCTION или SUPPLY" onChange={(e) => setType(e.target.value)} />
            <hr/>
            <FormControl placeholder="Адрес получателя заявки" onChange={(e) => setTargetAddress(e.target.value)} />
            <hr/>
            <FormControl placeholder="Название продукта" onChange={(e) => setProductName(e.target.value)} />
            <hr/>
            <FormControl placeholder="Объем" onChange={(e) => setVolume(e.target.value)} />
            <hr/>
            <FormControl placeholder="Дата поставки" onChange={(e) => setDeliveryDate(e.target.value)} />
            <hr/>
            <FormControl placeholder="Технические требования" onChange={(e) => setTechReqs(e.target.value)} />
            <hr/>
            <FormControl placeholder="Условия поставки" onChange={(e) => setDeliveryCond(e.target.value)} />
            <hr/>
            <FormControl placeholder="Адрес доставки" onChange={(e) => setAddress(e.target.value)} />
            <hr/>
            <FormControl placeholder="Условия оплаты" onChange={(e) => setPaymentTerms(e.target.value)} />
            <hr/>
            <FormControl placeholder="Хэш заявки" onChange={(e) => setRequestHash(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default CreateBid;