import { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { AtlantContext } from "../../core/context.jsx";

import Header from "../component/Header.jsx";
import Authorization from "../component/Authorization.jsx";

import RegisterOrg from "../component/func/RegisterOrg.jsx";
import UpdateAccount from "../component/func/UpdateAccount.jsx";
import SetActive from "../component/func/SetActive.jsx";

import AddProduct from "../component/func/AddProduct.jsx";
import ApproveProduct from "../component/func/ApproveProduct.jsx";

import CreateBid from "../component/func/CreateBid.jsx";
import RespondToBid from "../component/func/RespondToBid.jsx";
import ClientRespond from "../component/func/ClientRespond.jsx";

import AcceptBid from "../component/func/AcceptBid.jsx";
import UpdateStage from "../component/func/UpdateStage.jsx";
import MarkDelivered from "../component/func/MarkDelivered.jsx";

import FinalizeDelivery from "../component/func/FinalizeDelivery.jsx";

const Function = () => {
    const { isAuthorized } = useContext(AtlantContext);

    return (
        <div>
            <Header />

            {!isAuthorized ? (
                <Authorization />
            ) : (
                <div className="container">
                    <Tabs>
                        <Tab eventKey="accounts" title="Процесс 1: учетные записи">
                            <RegisterOrg />
                            <hr />
                            <UpdateAccount />
                            <hr />
                            <SetActive />
                        </Tab>

                        <Tab eventKey="products" title="Процесс 2: продукция">
                            <AddProduct />
                            <hr />
                            <ApproveProduct />
                        </Tab>

                        <Tab eventKey="bids" title="Процесс 3: заявки">
                            <CreateBid />
                            <hr />
                            <RespondToBid />
                            <hr />
                            <ClientRespond />
                        </Tab>

                        <Tab eventKey="supplier" title="Процесс 4: исполнение">
                            <AcceptBid />
                            <hr />
                            <UpdateStage />
                            <hr />
                            <MarkDelivered />
                        </Tab>

                        <Tab eventKey="finalize" title="Процесс 5: приемка">
                            <FinalizeDelivery />
                        </Tab>
                    </Tabs>
                </div>
            )}
        </div>
    );
};

export default Function;