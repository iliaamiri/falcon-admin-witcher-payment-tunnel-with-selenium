import React, {Fragment} from 'react';
import {Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FalconCardHeader from '../common/FalconCardHeader';
import axios from 'axios';
import querystring from "querystring";

function TestForm() {
  const submitHandler = async (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.classList.contains('disabled')) {
      return;
    }

    target.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    target.classList.add('disabled');

    const targetServer = document.querySelector('#target_server').value;
    const apiKey = document.querySelector('#api_key').value;
    const amount = document.querySelector('#amount').value;
    const returnUrl = document.querySelector('#return_url').value;

    try {
      const response = await axios.post(`${targetServer}invoice/request`,
        querystring.stringify({
          api_key: apiKey,
          amount: amount,
          return_url: returnUrl
        }),
        {
          crossdomain: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

      const data = response.data;
      console.log(data);

      if (data.status == 1) {
        window.open(`${targetServer}invoice/pay/${data.invoice_key}`, '_blank');
        target.innerHTML = 'Go';
        target.classList.remove('disabled');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      target.innerHTML = 'Go';
      target.classList.remove('disabled');
    }
  };

  return (
    <Fragment>
      <Card className="mb-3">
        <FalconCardHeader title="Test" light={false}/>
        <CardBody className="bg-light">
          <Form>
            <FormGroup>
              <Label for="target_server">Target Server</Label>
              <Input type="text" name="target_server" id="target_server" placeholder="Target Server"
                     defaultValue="https://sharea.site/"/>
            </FormGroup>
            <FormGroup>
              <Label for="api_key">Api Key</Label>
              <Input type="text" name="api_key" id="api_key" placeholder="Api Key"
                     defaultValue="056234a8af72e73128ac092fef059064"/>
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input type="number" name="amount" id="amount" placeholder="Amount" defaultValue="4500000"/>
            </FormGroup>
            <FormGroup>
              <Label for="return_url">Return Url</Label>
              <Input type="text" name="return_url" id="return_url" placeholder="Return Url" defaultValue="http://google.com"/>
            </FormGroup>
            <Button color="primary" onClick={submitHandler}>Go</Button>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
}

export default TestForm;
