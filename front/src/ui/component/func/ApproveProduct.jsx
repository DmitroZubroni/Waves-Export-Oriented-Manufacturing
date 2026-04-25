import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const ApproveProduct = () => {
    const { post } = useContext(AtlantContext);

    const [productId, setProductId] = useState("");
    const [certInfo, setCertInfo] = useState("");
    const [distributors, setDistributors] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "approveProduct" },
            { key: "productId", type: "string", value: productId },
            { key: "certInfo", type: "string", value: certInfo },
            { key: "distributors", type: "string", value: distributors },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>approveProduct</h2>
            <FormControl placeholder="Идентификатор продукта" onChange={(e) => setProductId(e.target.value)} />
            <hr/>
            <FormControl placeholder="Сведения о сертификатах" onChange={(e) => setCertInfo(e.target.value)} />
            <hr/>
            <FormControl placeholder="Список дистрибьюторов" onChange={(e) => setDistributors(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default ApproveProduct;