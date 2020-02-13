import React from 'react';
import BaseAppBar from '../components/common/BaseAppBar';
import Drawar from '../components/common/Drawer';

const AccountsMain = () => {
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
      </div>
    </>
  );
};

export default AccountsMain;
