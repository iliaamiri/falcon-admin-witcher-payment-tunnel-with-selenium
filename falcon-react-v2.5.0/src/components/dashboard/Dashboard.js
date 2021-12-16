import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, InputGroup, CustomInput } from 'reactstrap';
import CountUp from 'react-countup';
import CardSummary from './CardSummary';
import ActiveUsersBarChart from './ActiveUsersBarChart';
import PaymentsLineChart from './PaymentsLineChart';
import { toast } from 'react-toastify';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';



import loadable from '@loadable/component';
import DashBoardDepositStatus from './DashboardDepositStatus';
import {statistics} from "../../witcherApi/api";
const PurchasesTable = loadable(() => import('./PurchasesTable'));
const ActiveUsersMap = loadable(() => import('./ActiveUsersMap'));

const Dashboard = () => {
  // State
  const [isSelected, setIsSelected] = useState(false);

  const [todayIncome, setTodayIncome] = useState(0);
  const [yesterdayIncome, setYesterdayIncome] = useState(0);

    const setIncomes = async () => {
        const todayTotalIncome = await statistics.getTodayTotalIncome();
        const yesterdayTotalIncome = await statistics.getYesterdayTotalIncome();

        setTodayIncome(todayTotalIncome.data.todayTotalIncomeTomans);
        setYesterdayIncome(yesterdayTotalIncome.data.yesterdayTotalIncomeTomans);
    }

    useEffect(() => {
        setIncomes();
    }, [])


  useEffect(() => {
    toast(
      <Fragment>
        Welcome to <strong>Falcon React</strong>!<br />
        ReactJS Dashboard and WebApp Template
      </Fragment>
    );
  }, []);

  return (
    <Fragment>
      {/*<PaymentsLineChart />*/}
      {/*<DashBoardDepositStatus />*/}
      <div className="card-deck">
        {/*<CardSummary rate="-0.23%" title="Customers" color="warning" linkText="See all">*/}
        {/*  58.39k*/}
        {/*</CardSummary>*/}
          <CardSummary title="خرید امروز" color="info" linkText="">
              {todayIncome} تومان
          </CardSummary>
        <CardSummary title="خرید دیروز" color="success" linkText="">
            {yesterdayIncome} تومان
        </CardSummary>

          {/*<CardSummary rate="-0.23%" title="خرید امروز" color="info" linkText="See all">*/}
          {/*    {todayIncome} تومان*/}
          {/*</CardSummary>*/}
          {/*<CardSummary rate="0.0%" title="خرید دیروز" color="success" linkText="All orders">*/}
          {/*    {yesterdayIncome} تومان*/}
          {/*</CardSummary>*/}

        {/*<CardSummary content="43,594" rate="9.54%" title="Revenue" color="success" linkText="Statistics">*/}
        {/*  <CountUp end={43594} duration={5} prefix="$" separator="," decimal="." />*/}
        {/*</CardSummary>*/}
      </div>
      {/*<Card className="mb-3">*/}
      {/*  <FalconCardHeader title="Recent Purchases" light={false}>*/}
      {/*    {isSelected ? (*/}
      {/*      <InputGroup size="sm" className="input-group input-group-sm">*/}
      {/*        <CustomInput type="select" id="bulk-select">*/}
      {/*          <option>Bulk actions</option>*/}
      {/*          <option value="Refund">Refund</option>*/}
      {/*          <option value="Delete">Delete</option>*/}
      {/*          <option value="Archive">Archive</option>*/}
      {/*        </CustomInput>*/}
      {/*        <Button color="falcon-default" size="sm" className="ml-2">*/}
      {/*          Apply*/}
      {/*        </Button>*/}
      {/*      </InputGroup>*/}
      {/*    ) : (*/}
      {/*      <Fragment>*/}
      {/*        <ButtonIcon icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">*/}
      {/*          New*/}
      {/*        </ButtonIcon>*/}
      {/*        <ButtonIcon icon="filter" transform="shrink-3 down-2" color="falcon-default" size="sm" className="mx-2">*/}
      {/*          Filter*/}
      {/*        </ButtonIcon>*/}
      {/*        <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" size="sm">*/}
      {/*          Export*/}
      {/*        </ButtonIcon>*/}
      {/*      </Fragment>*/}
      {/*    )}*/}
      {/*  </FalconCardHeader>*/}
      {/*  <CardBody className="p-0">*/}
      {/*    <PurchasesTable setIsSelected={setIsSelected} />*/}
      {/*  </CardBody>*/}
      {/*</Card>*/}
      {/*<Row noGutters>*/}
      {/*  <Col lg="4" className="pr-lg-2">*/}
      {/*    <ActiveUsersBarChart />*/}
      {/*  </Col>*/}
      {/*  <Col lg="8" className="pl-lg-2">*/}
      {/*    <ActiveUsersMap />*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </Fragment>
  );
};

export default Dashboard;
