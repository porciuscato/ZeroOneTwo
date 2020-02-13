import React from 'react';
import BaseAppBar from '../components/common/BaseAppBar';
import Drawar from '../components/common/Drawer';
import { Typography, Button } from '@material-ui/core';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, ArcSeries } from 'react-vis';
import './AccountsDetail.scss';
import Panel from '../components/accounts/Panel';
import axios from 'axios';

const AccountsDetail = () => {
  const myData = [
    {
      angle0: 0,
      angle: Math.PI / 4,
      opacity: 0.2,
      radius: 2,
      radius0: 1,
      color: 1,
    },
    {
      angle0: Math.PI / 4,
      angle: (2 * Math.PI) / 4,
      radius: 3,
      radius0: 0,
      color: 2,
    },
    {
      angle0: (2 * Math.PI) / 4,
      angle: (3 * Math.PI) / 4,
      radius: 2,
      radius0: 0,
      color: 3,
    },
    {
      angle0: (3 * Math.PI) / 4,
      angle: (4 * Math.PI) / 4,
      radius: 2,
      radius0: 0,
      color: 4,
    },
    {
      angle0: (4 * Math.PI) / 4,
      angle: (5 * Math.PI) / 4,
      radius: 2,
      radius0: 0,
      color: 5,
    },
    {
      angle: 0,
      angle0: (5 * Math.PI) / 4,
      radius: 2,
      radius0: 1.5,
      color: 6,
    },
  ];

  const getExchangeRequest = async () => {
    try {
      return await axios.get(
        'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=CQJZGTj2RAQYrW61ldyW2PYU4MPhBzKM&searchdate=20180102&data=AP01',
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getExchange = async () => {
    const resData = await getExchangeRequest();
    console.log(resData);
  };

  return (
    <>
      <div
        style={{
          width: 'inherit',
          height: 'inherit',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <BaseAppBar
          style={{ flexGrow: '0' }}
          text="영일이"
          leftType="icon"
          leftIcon={<Drawar />}
        />

        <Typography variatn="h3">무슨 폴더냐 여기는</Typography>
        <Typography variatn="h6">환율 기준일</Typography>
        <Typography variatn="h6">환율 나라</Typography>
        <Button>환율 계산</Button>

        <Panel />
        <Panel />

        <XYPlot xDomain={[-5, 5]} yDomain={[-5, 5]} width={300} height={300}>
          <ArcSeries
            data={myData}
            colorDomain={[0, 1, 6]}
            colorRange={['#fff', 'pink', 'blue']}
            colorType="linear"
          />
        </XYPlot>
      </div>
    </>
  );
};

export default AccountsDetail;
