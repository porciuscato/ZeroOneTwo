import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ExifOrientationImg from 'react-exif-orientation-img';
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Slide,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Translate = props => {
  const history = useHistory();
  const [imgBase64, setImgBase64] = useState(props.location.state.imgBase64);
  const [openImgDialog, setOpenImgDialog] = useState(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [folder, setFolder] = useState('');

  const handleCloseImgDialog = () => {
    setOpenImgDialog(false);
  };

  const handleCloseSubmitDialog = () => {
    setOpenSubmitDialog(false);
  };

  const handleChangeFolder = event => {
    setFolder(event.target.value);
  };

  const submitAccounts = () => {
    history.push('/AccountsDetail');
  };

  return (
    <>
      <Grid container direction="column" alignContent="space-around">
        <Grid
          item
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <PhotoCamera
            onClick={() => {
              setOpenImgDialog(true);
            }}
          />
        </Grid>

        <Typography>상호명</Typography>
        <TextField id="standard-basic" label="상호명" />

        <Typography>총액</Typography>
        <TextField id="standard-basic" label="총액" />

        <Typography>이름</Typography>
        <TextField id="standard-basic" label="상품명" />
        <Typography>가격</Typography>
        <TextField id="standard-basic" label="가격" />

        <Grid item>
          <Button
            onClick={() => {
              history.push('/');
            }}
          >
            <Typography variant="h5">취소</Typography>
          </Button>
          <Button
            onClick={() => {
              setOpenSubmitDialog(true);
            }}
          >
            <Typography variant="h5">저장</Typography>
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={openImgDialog}
        onClose={handleCloseImgDialog}
        TransitionComponent={Transition}
      >
        <DialogTitle id="form-dialog-title">영수증을 확인하세요.</DialogTitle>
        <DialogContent>
          <ExifOrientationImg
            src={imgBase64}
            alt="img"
            style={{
              height: '300px',
              width: '350px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImgDialog} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSubmitDialog}
        onClose={handleCloseSubmitDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">폴더를 선택해주세요.</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-select-currency"
            select={true}
            fullWidth
            label="Country"
            value={folder}
            onChange={handleChangeFolder}
          >
            <MenuItem key="1" value="미국">
              미국
            </MenuItem>
            <MenuItem key="2" value="일본">
              일본
            </MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSubmitDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleCloseSubmitDialog} color="primary">
            생성
          </Button>
          <Button onClick={submitAccounts} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Translate;
