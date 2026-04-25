import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const RegisterOrg = () => {
    const { post } = useContext(AtlantContext);

    const [orgWallet, setOrgWallet] = useState("");
    const [name, setName] = useState("");
    const [orgType, setOrgType] = useState("");
    const [region, setRegion] = useState("");
    const [description, setDescription] = useState("");
    const [userWallet, setUserWallet] = useState("");
    const [userRole, setUserRole] = useState("");
    const [fullName, setFullName] = useState("");
    const [contact, setContact] = useState("");
    const [position, setPosition] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "registerOrg" },
            { key: "orgWallet", type: "string", value: orgWallet },
            { key: "name", type: "string", value: name },
            { key: "orgType", type: "string", value: orgType },
            { key: "region", type: "string", value: region },
            { key: "description", type: "string", value: description },
            { key: "userWallet", type: "string", value: userWallet },
            { key: "userRole", type: "string", value: userRole },
            { key: "fullName", type: "string", value: fullName },
            { key: "contact", type: "string", value: contact },
            { key: "position", type: "string", value: position },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>registerOrg</h2>
            <FormControl placeholder="Адрес организации"
                onChange={(e) => setOrgWallet(e.target.value)}/>
            <hr/>
            <FormControl
                placeholder="Название организации"
                onChange={(e) => setName(e.target.value)}/>
            <hr/>
            <FormControl
                placeholder="Тип организации"
                onChange={(e) => setOrgType(e.target.value)}/>
            <hr/>
            <FormControl
                placeholder="Регион"
                onChange={(e) => setRegion(e.target.value)}/>
            <hr/>
            <FormControl
                placeholder="Описание"
                onChange={(e) => setDescription(e.target.value)}/>
            <hr/>
            <FormControl
                placeholder="Адрес сотрудника"
                onChange={(e) => setUserWallet(e.target.value)}/>
            <hr/>
            <FormControl
                placeholder="Роль сотрудника"
                onChange={(e) => setUserRole(e.target.value)}/>
            <hr/>
            <FormControl
                placeholder="ФИО сотрудника"
                onChange={(e) => setFullName(e.target.value)}/>
            <hr/>
            <FormControl
                placeholder="Контактные данные"
                onChange={(e) => setContact(e.target.value)}/>
            <hr/>
            <FormControl
                placeholder="Должность"
                onChange={(e) => setPosition(e.target.value)}/>

            <Button type="submit">Отправить</Button>

        </Form>
    );
};

export default RegisterOrg;