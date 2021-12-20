import React, {Fragment, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    Col,
    CustomInput,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    UncontrolledTooltip
} from "reactstrap";
import FalconCardHeader from "../common/FalconCardHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import iconPaypalFull from "../../assets/img/icons/icon-paypal-full.png";
import iconPaymentMethods from "../../assets/img/icons/icon-payment-methods.png";
import {isIterableArray} from "../../helpers/utils";
import countries from "../../data/billing/countries";
import { reports } from "../../witcherApi/api";
import UncontrolledAlert from "reactstrap/es/UncontrolledAlert";

const ReportForm = ({ updateData, handleError }) => {

    const [orderNumber, setOrderNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [verify, setVerify] = useState('');
    const [invoiceKey, setInvoiceKey] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        reports.get({
            api_key: apiKey,
            invoice_key: invoiceKey,
            order_number: orderNumber,
            pan: cardNumber,
            verify: verify,
            page: 1,
            results_per_page: 20
        })
            .then(rawData => rawData.data)
            .then(data => updateData(data))
            .catch(err => {
                handleError("No result was found!")
            });
    }


    const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

    return (
        <Card className="h-100">
            <FalconCardHeader title="Reports" light={false} />
            <CardBody className="bg-light">
                <Row tag={Form} onSubmit={handleSubmit}>
                    <Col>

                {/*        <CustomInput*/}
                {/*            type="radio"*/}
                {/*            name="billing"*/}
                {/*            id="card"*/}
                {/*            value="card"*/}
                {/*            label={*/}
                {/*                <span className="d-flex align-items-center">*/}
                {/*  <span className="fs-1 text-nowrap">Credit Card</span>*/}
                {/*  <img className="d-none d-sm-inline-block ml-2 mt-lg-0" src={iconPaymentMethods} height={20} alt="" />*/}
                {/*</span>*/}
                {/*            }*/}
                {/*        />*/}
                {/*        <p className="fs--1 mb-4">*/}
                {/*            Safe money transfer using your bank accounts. Visa, maestro, discover, american express.*/}
                {/*        </p>*/}

                        <Row form>
                            <Col>
                                <FormGroup>
                                    <Label className={labelClasses} for="verify">
                                        بررسی
                                    </Label>
                                    <Input
                                        type="select"
                                        name="select"
                                        id="verify"
                                        value={verify}
                                        onChange={({ target }) => setVerify(target.value)}
                                    >
                                        <option></option>
                                        <option>بدون برگشت</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={labelClasses} for="invoice_key">
                                        Invoice Key
                                    </Label>
                                    <Input
                                        placeholder=""
                                        id="invoice_key"
                                        value={invoiceKey}
                                        onChange={({ target }) => setInvoiceKey(target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={labelClasses} for="ordernumber">
                                        Order-Number
                                    </Label>
                                    <Input
                                        placeholder=""
                                        id="ordernumber"
                                        value={orderNumber}
                                        onChange={({ target }) => setOrderNumber(target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={labelClasses} for="cardNumber">
                                        Card Number (PAN)
                                    </Label>
                                    <Input
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        id="cardNumber"
                                        value={cardNumber}
                                        onChange={({ target }) => setCardNumber(target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={labelClasses} for="api_key">
                                        API KEY
                                    </Label>
                                    <Input
                                        placeholder=""
                                        id="api_key"
                                        value={apiKey}
                                        onChange={({ target }) => setApiKey(target.value)}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Button color={"primary"} size="md" className="mr-2">
                            {"نمایش"}
                        </Button>
                        {/*<Row form>*/}
                        {/*    <Col xs={6} sm={3}>*/}
                        {/*        <FormGroup>*/}
                        {/*            <Label className={labelClasses} for="customSelectCountry">*/}
                        {/*                Country*/}
                        {/*            </Label>*/}
                        {/*            <CustomInput*/}
                        {/*                type="select"*/}
                        {/*                id="country"*/}
                        {/*                name="country"*/}
                        {/*                value={country}*/}
                        {/*                onChange={({ target }) => setCountry(target.value)}*/}
                        {/*            >*/}
                        {/*                {isIterableArray(countries) &&*/}
                        {/*                countries.map((country, index) => (*/}
                        {/*                    <option value={country} key={index}>*/}
                        {/*                        {country}*/}
                        {/*                    </option>*/}
                        {/*                ))}*/}
                        {/*            </CustomInput>*/}
                        {/*        </FormGroup>*/}
                        {/*    </Col>*/}
                        {/*    <Col xs={6} sm={3}>*/}
                        {/*        <FormGroup className="form-group">*/}
                        {/*            <Label className={labelClasses} for="zipCode">*/}
                        {/*                Zip Code*/}
                        {/*            </Label>*/}
                        {/*            <Input placeholder="1234" id="zipCode" value={zip} onChange={({ target }) => setZip(target.value)} />*/}
                        {/*        </FormGroup>*/}
                        {/*    </Col>*/}
                        {/*    <Col xs={6} sm={3}>*/}
                        {/*        <FormGroup>*/}
                        {/*            <Label className={labelClasses} for="expDate">*/}
                        {/*                Exp Date*/}
                        {/*            </Label>*/}
                        {/*            <Input*/}
                        {/*                placeholder="15/2024"*/}
                        {/*                id="expDate"*/}
                        {/*                value={expDate}*/}
                        {/*                onChange={({ target }) => setExpDate(target.value)}*/}
                        {/*            />*/}
                        {/*        </FormGroup>*/}
                        {/*    </Col>*/}
                        {/*    <Col xs={6} sm={3}>*/}
                        {/*        <FormGroup>*/}
                        {/*            <Label className={labelClasses} for="cvv">*/}
                        {/*                CVV*/}
                        {/*                <FontAwesomeIcon icon="question-circle" className="ml-2 cursor-pointer" id="tooltipCVV" />*/}
                        {/*                <UncontrolledTooltip placement="top" target="tooltipCVV">*/}
                        {/*                    Card verification value*/}
                        {/*                </UncontrolledTooltip>*/}
                        {/*            </Label>*/}
                        {/*            <Input*/}
                        {/*                placeholder="123"*/}
                        {/*                maxLength="3"*/}
                        {/*                id="cvv"*/}
                        {/*                value={cvv}*/}
                        {/*                onChange={({ target }) => setCvv(target.value)}*/}
                        {/*            />*/}
                        {/*        </FormGroup>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ReportForm;