import React, { useState } from 'react';
import './Main.scss';
import { Grid, Typography } from '@material-ui/core';
import BaseAppBar from '../components/common/BaseAppBar';
import Drawar from '../components/common/Drawer';

const Main = () => {
  const [imgBase64, setImgBase64] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const changeImgFile = file => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (file) {
      reader.readAsDataURL(file);
      setImgFile(file);
    }
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
        <Typography variant="h3">안녕! 012!</Typography>
        <label className="custom-file-upload">
          <input type="file" onChange={e => changeImgFile(e.target.files[0])} />
          img Upload
        </label>
        <img src={imgBase64} alt="img" />
      </div>
    </>
  );
};

export default Main;
