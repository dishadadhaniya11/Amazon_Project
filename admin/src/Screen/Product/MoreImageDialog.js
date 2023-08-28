import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';


export default function MoreImageDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const {image} = props
  const [select , setSelect] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Button className="mt-2 w-100" variant="contained" onClick={handleClickOpen}>
        Select More images
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Images</DialogTitle>
        <DialogContent>
          
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <div className='showData d-flex align-item-center justify-content-center'>
                <label
                 htmlFor='file'
                 className='col-12 mb-0 col-sm-6 overflow-hidden col-md-6 d-flex align-items-center justify-content-center'
                 style={{
                    height:"9.4rem",
                    width:"9.4rem",
                    border:"2px dashed gray",
                 }} 
                 
                >

                </label>
                {
                   image.map((x) => {
                    return(
                        <>
                        {/* {
                            x.mimetype === 'image' ? (
                                <img src={x.url}
                                alt='error'
                                className='image-fluid m-1'
                                style={{height:"150px" , width:"150px" ,  border:select._id === x._id ? "4px solid blue" : ""}}
                                 />
                            ):()
                        } */}
                        </>
                    )
                   }) 
                }

            </div>
            
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}