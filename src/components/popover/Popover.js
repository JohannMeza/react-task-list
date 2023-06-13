import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

export default function Popover({children, list = [], style, className}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleClickEditar = () => {
    handleClose()
  }

  const handleClickItem = (callback) => {
    handleClose()
    callback()
  }

  return (
    <>
      <span
        className={className}
        style={{ ...style, display: 'inline-block' }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}component="small" color="primary"
      >{children ? children[0] || children : <></>}</span>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { list.map((item, index) => <MenuItem key={index} onClick={() => handleClickItem(item.callback)}>{item.option}</MenuItem>)}
      </Menu>
    </>
  )
}