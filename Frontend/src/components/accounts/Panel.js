import React, { useState } from 'react';
import { Typography, ListItem, Collapse, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const Panel = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem onClick={handleClick} style={{ paddingBottom: '24px' }}>
        <Typography
          style={{
            position: 'absolute',
            left: '4px',
            top: '12px',
            marginLeft: '12px',
          }}
        >
          상호명
        </Typography>
        <Typography
          style={{
            position: 'absolute',
            right: '4px',
            top: '12px',
            marginRight: '144px',
          }}
        >
          금액
        </Typography>
        <Typography
          style={{
            position: 'absolute',
            right: '4px',
            top: '12px',
            marginRight: '48px',
          }}
        >
          날짜
        </Typography>
        <AddIcon
          style={{
            position: 'absolute',
            right: '4px',
            top: '12px',
            marginRight: '12px',
          }}
        />
      </ListItem>
      <Collapse in={open}>
        <List component="div">
          <ListItem style={{ marginBottom: '8px' }}>
            <Typography
              style={{
                position: 'absolute',
                left: '4px',
                top: '12px',
                marginLeft: '24px',
              }}
            >
              품목
            </Typography>
            <Typography
              style={{
                position: 'absolute',
                right: '4px',
                top: '12px',
                marginRight: '144px',
              }}
            >
              금액
            </Typography>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default Panel;
