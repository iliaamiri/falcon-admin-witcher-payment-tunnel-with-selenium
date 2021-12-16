import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import {Button, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import withRedirect from '../../hoc/withRedirect';
import {auth} from '../../witcherApi/api';

const LoginForm = ({setRedirect, hasLabel, layout}) => {
    // State
    const [api_key, setApiKey] = useState('');
    const [remember, setRemember] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    // Handler
    const handleSubmit = e => {
        e.preventDefault();

        // connect and auth here
        auth.login(api_key)
            .then(response => response.data)
            .then(data => {
                if (data['token'] !== undefined) {
                    return data['token'];
                }
            })
            .then(token => auth.saveToken(token))
            .then(() => {
                toast.success(`Logged in as ${api_key}`);
                window.location.href = '/';
            })
            .catch(err => {
                console.log(err)
            })


    };

    useEffect(() => {
        setIsDisabled(!api_key);
    }, [api_key]);

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                {hasLabel && <Label>Api Key</Label>}
                <Input
                    placeholder={!hasLabel ? 'Api Key' : ''}
                    value={api_key}
                    onChange={({target}) => setApiKey(target.value)}
                    type="text"
                />
            </FormGroup>
            <Row className="justify-content-between align-items-center">
                <Col xs="auto">
                    <CustomInput
                        id="customCheckRemember"
                        label="Remember me"
                        checked={remember}
                        onChange={({target}) => setRemember(target.checked)}
                        type="checkbox"
                    />
                </Col>
                <Col xs="auto">
                    <Link className="fs--1" to={`/auth/forget-apikey`}>
                        Forget Your Api Key?
                    </Link>
                </Col>
            </Row>
            <FormGroup>
                <Button color="primary" block className="mt-3" disabled={isDisabled}>
                    Log in
                </Button>
            </FormGroup>
            {/*<Divider className="mt-4">or log in with</Divider>*/}
            {/*<SocialAuthButtons />*/}
        </Form>
    );
};

LoginForm.propTypes = {
    setRedirect: PropTypes.func.isRequired,
    layout: PropTypes.string,
    hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
    layout: 'basic',
    hasLabel: false
};

export default withRedirect(LoginForm);
