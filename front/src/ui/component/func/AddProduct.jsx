import { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AtlantContext } from "../../../core/context.jsx";

const AddProduct = () => {
    const { post } = useContext(AtlantContext);

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [regions, setRegions] = useState("");
    const [minVolume, setMinVolume] = useState("");
    const [maxVolume, setMaxVolume] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "addProduct" },
            { key: "name", type: "string", value: name },
            { key: "imageUrl", type: "string", value: imageUrl },
            { key: "description", type: "string", value: description },
            { key: "regions", type: "string", value: regions },
            { key: "minVolume", type: "string", value: minVolume },
            { key: "maxVolume", type: "string", value: maxVolume },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>addProduct</h2>
            <FormControl placeholder="Название продукта" onChange={(e) => setName(e.target.value)} />
            <hr/>
            <FormControl placeholder="Ссылка на изображение" onChange={(e) => setImageUrl(e.target.value)} />
            <hr/>
            <FormControl placeholder="Описание продукта" onChange={(e) => setDescription(e.target.value)} />
            <hr/>
            <FormControl placeholder="Регионы поставки" onChange={(e) => setRegions(e.target.value)} />
            <hr/>
            <FormControl placeholder="Минимальный объем" onChange={(e) => setMinVolume(e.target.value)} />
            <hr/>
            <FormControl placeholder="Максимальный объем" onChange={(e) => setMaxVolume(e.target.value)} />

            <Button type="submit">Отправить</Button>
        </Form>
    );
};

export default AddProduct;