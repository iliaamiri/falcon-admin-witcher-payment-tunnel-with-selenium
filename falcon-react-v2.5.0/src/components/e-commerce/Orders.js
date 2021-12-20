import React, {createRef, Fragment, useEffect, useState} from 'react';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import ButtonIcon from '../common/ButtonIcon';
import { Link } from 'react-router-dom';
import Badge from 'reactstrap/es/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconCardHeader from '../common/FalconCardHeader';
import { reports } from '../../witcherApi/api';
import orders from '../../data/e-commerce/orders';
import { getPaginationArray } from '../../helpers/utils';
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Flex from "../common/Flex";
import FalconInput from "../common/FalconInput";
import ReportForm from "../myCustoms/ReportsForm";
import UncontrolledAlert from "reactstrap/es/UncontrolledAlert";

const seleniumServerIdFormatter = (dataField, { selenium_server_id }: row) => (
  <Fragment>
    <strong>{selenium_server_id}</strong>
  </Fragment>
)

const orderFormatter = (dataField, { id, name, email }: row) => (
  <Fragment>
    <Link to="/e-commerce/order-details">
      <strong>#{id}</strong>
    </Link>{' '}
    {/*by <strong>{name}</strong>*/}
    <br />
    {/*<a href={`mailto:${email}`}>{email}</a>*/}
  </Fragment>
);

const shippingFormatter = (address, { shippingType }: row) => (
  <Fragment>
    {address}
    <p className="mb-0 text-500">{shippingType}</p>
  </Fragment>
);

const badgeFormatter = status => {
  let color = '';
  let icon = '';
  let text = '';
  switch (status) {
    case 1:
      color = 'success';
      icon = 'check';
      text = 'پرداخت موفق';
      break;
    case 11:
      color = 'secondary';
      icon = 'check';
      text = 'پرداخت موفق';
      break;
    case 12:
      color = 'success';
      icon = 'check';
      text = 'پرداخت موفق';
      break;
    case 5:
      color = 'secondary';
      icon = 'ban';
      text = 'خطا';
      break;
    // case 'processing':
    //   color = 'primary';
    //   icon = 'redo';
    //   text = 'Processing';
    //   break;
    case 0:
      color = 'warning';
      icon = 'stream';
      text = 'معلق';
      break;
    default:
      color = 'warning';
      icon = 'stream';
      text = 'معلق';
  }

  return (
    <Badge color={`soft-${color}`} className="rounded-capsule fs--1 d-block">
      {text}
      <FontAwesomeIcon icon={icon} transform="shrink-2" className="ml-1" />
    </Badge>
  );
};

const amountFormatter = amount => {
  return (
    <Fragment>
      {'تومان'}
      {amount}
    </Fragment>
  );
};

const actionFormatter = (dataField, { id }: row) => (
  // Control your row with this id
  <UncontrolledDropdown>
    <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
      <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
    </DropdownToggle>
    <DropdownMenu right className="border py-2">
      <DropdownItem onClick={() => console.log('Completed: ', id)}>Completed</DropdownItem>
      <DropdownItem onClick={() => console.log('Processing: ', id)}>Processing</DropdownItem>
      <DropdownItem onClick={() => console.log('On hold: ', id)}>On hold</DropdownItem>
      <DropdownItem onClick={() => console.log('Pending: ', id)}>Pending</DropdownItem>
      <DropdownItem divider />
      <DropdownItem onClick={() => console.log('Delete: ', id)} className="text-danger">
        Delete
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const callbackVerificationFormatter = (dataField, { return_url }: row) => {
  if (dataField === "verified") {
    return <td style={{
      background: "green",
      borderRadius: "4px",
      padding: "6px 20px 6px 20px",
      color: "white"
    }}>تایید برگشت</td>
  } else {
    return <a title={return_url} style={{color: "red"}} href={return_url}>لینک برگشت</a>
  }
};

const creationTimeFormatter = (dataField, {}: row) => {
  let time = new Date(dataField * 1000);

  let year = time.getFullYear();
  let month = time.getMonth();
  let day = time.getDate();

  let hours = time.getHours();
  let minutes = time.getMinutes();
  let second = time.getSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${second}`;
};

const bankCodeFormatter = (dataField) => {
  if (dataField == null) {
    return (<Badge color="soft-warning" className="rounded-capsule fs--1 d-block">
      ثبت نشده
      <FontAwesomeIcon icon="stream" transform="shrink-2" className="ml-1" />
    </Badge>)
  }

  return (<td style={{
    background: "#FFE8FE",
    color: "blue"
  }}>{dataField}</td>)
};

const cardNumberFormatter = (dataField, {}:row) => {
   if (dataField == null) {
     return (
         <Badge color="soft-warning" className="rounded-capsule fs--1 d-block">
          وارد نشده
          <FontAwesomeIcon icon="stream" transform="shrink-2" className="ml-1" />
         </Badge>
     )
   }

   return dataField
};

const columns = [
  {
    dataField: 'selenium_server_id',
    text: 'S',
    classes: 'py-2 align-middle',
    formatter: seleniumServerIdFormatter,
    sort: true
  },
  {
    dataField: 'id',
    text: 'ID',
    classes: 'py-2 align-middle',
    formatter: orderFormatter,
    sort: true
  },
  {
    dataField: 'api_key',
    text: 'API',
    classes: 'py-2 align-middle',
    sort: true
  },
  {
    dataField: 'amount',
    text: 'مبلغ تومان',
    classes: 'py-2 align-middle',
    formatter: amountFormatter,
    sort: true,
    align: 'right',
    headerAlign: 'right'
  },,
  {
    dataField: 'status',
    text: 'وضعیت',
    classes: 'py-2 align-middle',
    formatter: badgeFormatter,
    sort: true
  },
  {
    dataField: 'submitted_cardNumber',
    text: 'شماره کارت',
    classes: 'py-2 align-middle',
    formatter: cardNumberFormatter,
    sort: true,
    // align: 'right',
    // headerAlign: 'right'
  },
  {
    dataField: 'creation_time',
    text: 'زمان پرداخت',
    classes: 'py-2 align-middle',
    formatter: creationTimeFormatter,
  },
  {
    dataField: 'bank_code',
    text: 'کد پیگیری',
    classes: 'py-2 align-middle',
    formatter: bankCodeFormatter,
    align: 'right'
  },
  {
    dataField: 'TEST',
    text: 'تاییدیه برگشت',
    classes: 'py-2 align-middle',
    formatter: callbackVerificationFormatter,
    align: 'right'
  }
];

const SelectRowInput = ({ indeterminate, rowIndex, ...rest }) => (
  <div className="custom-control custom-checkbox">
    <input
      className="custom-control-input"
      {...rest}
      onChange={() => {}}
      ref={input => {
        if (input) input.indeterminate = indeterminate;
      }}
    />
    <label className="custom-control-label" />
  </div>
);

const selectRow = onSelect => ({
  mode: 'checkbox',
  classes: 'py-2 align-middle',
  clickToSelect: false,
  selectionHeaderRenderer: ({ mode, ...rest }) => <SelectRowInput type="checkbox" {...rest} />,
  selectionRenderer: ({ mode, ...rest }) => <SelectRowInput type={mode} {...rest} />,
  onSelect: onSelect,
  onSelectAll: onSelect
});

const Orders = () => {
  const [reportsData, setReportsData] = useState({data: []});
  const [errorMessage, setErrorMessage] = useState('');

  const getReport = async () => {
    const response = await reports.get();

    const responseData = response.data;

    setReportsData(responseData);
  }

  useEffect(() => {
    getReport();
  }, [])

  // console.log(reportsData)

  const options = {
    custom: true,
    sizePerPage: reportsData.results_per_page,
    totalSize: reportsData.data.length
  };

  let table = createRef();
  // State
  const [isSelected, setIsSelected] = useState(false);
  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };

  return (
    <>
      <ReportForm updateData={setReportsData} handleError={setErrorMessage}/>
      <Card className="mb-3">
        <FalconCardHeader light={false}>
          {isSelected ? (
              <InputGroup size="sm" className="input-group input-group-sm">
                <CustomInput type="select" id="bulk-select">
                  <option>Bulk actions</option>
                  <option value="Refund">Refund</option>
                  <option value="Delete">Delete</option>
                  <option value="Archive">Archive</option>
                </CustomInput>
                <Button color="falcon-default" size="sm" className="ml-2">
                  Apply
                </Button>
              </InputGroup>
          ) : (
              <Fragment>
                {/*<ButtonIcon icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">*/}
                {/*  New*/}
                {/*</ButtonIcon>*/}
                {/*<ButtonIcon icon="filter" transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">*/}
                {/*  Filter*/}
                {/*</ButtonIcon>*/}
                {/*<ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">*/}
                {/*  Export*/}
                {/*</ButtonIcon>*/}
              </Fragment>
          )}
        </FalconCardHeader>
        {errorMessage && (
            <UncontrolledAlert color="danger" >
              {errorMessage}
            </UncontrolledAlert>
        )}

        <CardBody className="p-0">
          <PaginationProvider pagination={paginationFactory(options)}>
            {({ paginationProps, paginationTableProps }) => {
              const lastIndex = paginationProps.page * paginationProps.sizePerPage;

              function setCardNumber() {

              }

              return (
                  <Fragment>
                    {/* To add the form for reports and shits */}

                    {/*<Row noGutters className="px-1 py-3 flex-between-center">*/}
                    {/*  <Form>*/}
                    {/*    <FormGroup>*/}
                    {/*      <FalconInput*/}
                    {/*          label="Card Number"*/}
                    {/*          className="input-spin-none"*/}
                    {/*          placeholder="•••• •••• •••• ••••"*/}
                    {/*          onChange={setCardNumber}*/}
                    {/*          type="number"*/}
                    {/*      />*/}
                    {/*    </FormGroup>*/}
                    {/*  </Form>*/}
                    {/*</Row>*/}
                    <div className="table-responsive">
                      <BootstrapTable
                          ref={table}
                          bootstrap4
                          keyField="id"
                          data={reportsData.data}
                          columns={columns}
                          selectRow={selectRow(onSelect)}
                          bordered={false}
                          classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap"
                          rowClasses="btn-reveal-trigger"
                          headerClasses="bg-200 text-900"
                          {...paginationTableProps}
                      />
                    </div>
                    <Row noGutters className="px-1 py-3 flex-center">
                      <Col xs="auto">
                        <Button
                            color="falcon-default"
                            size="sm"
                            onClick={handlePrevPage(paginationProps)}
                            disabled={paginationProps.page === 1}
                        >
                          <FontAwesomeIcon icon="chevron-left" />
                        </Button>
                        {getPaginationArray(paginationProps.totalSize, paginationProps.sizePerPage).map(pageNo => {
                        return (
                            <Button
                                color={paginationProps.page === pageNo ? 'falcon-primary' : 'falcon-default'}
                                size="sm"
                                className="ml-2"
                                onClick={() => paginationProps.onPageChange(pageNo)}
                                key={pageNo}
                            >
                              {pageNo}
                            </Button>
                        )
                        })}
                        <Button
                            color="falcon-default"
                            size="sm"
                            className="ml-2"
                            onClick={handleNextPage(paginationProps)}
                            disabled={lastIndex >= paginationProps.totalSize}
                        >
                          <FontAwesomeIcon icon="chevron-right" />
                        </Button>
                      </Col>
                    </Row>
                  </Fragment>
              );
            }}
          </PaginationProvider>
        </CardBody>
      </Card>
    </>
  );
};

export default Orders;
