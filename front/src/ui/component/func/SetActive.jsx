import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const SetActive = () => {
    const { post } = useContext(AtlantContext);

    const [orgWallet, setOrgWallet] = useState("");
    const [userWallet, setUserWallet] = useState("");
    const [isActive, setIsActive] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "setActive" },
            { key: "orgWallet", type: "string", value: orgWallet },
            { key: "userWallet", type: "string", value: userWallet },
            { key: "isActive", type: "boolean", value: isActive === "true" },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>setActive</h2>
            <FormControl placeholder="Адрес организации" onChange={(e) => setOrgWallet(e.target.value)} />
            <hr/>
            <FormControl placeholder="Адрес сотрудника" onChange={(e) => setUserWallet(e.target.value)} />
            <hr/>
            <FormControl placeholder="Активность true или false" onChange={(e) => setIsActive(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default SetActive;