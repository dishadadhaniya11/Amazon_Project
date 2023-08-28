import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import apiHelper from '../../Common/Apihelper';
import { useState } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


export default function ImageDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const {image , fetchMediaHandller , setFeatureImage} = props  
  const [select , setSelect] = useState({})

  const handleClickOpen = async() => {
    setOpen(true);
    fetchMediaHandller()
  };
  
  

  const uploadImage = async (file) => {
    try {
      const form = new FormData()
      
      form.append("file",file)
      console.log(form);
      const File = form
      const result = await apiHelper.uploadImages(File)
      if(result.status === 200){
        fetchMediaHandller()
      }

    } catch (error) {
      console.log(error);
    }
  }



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

  // const showData = async () => {
  //   try {
  //       const result = await apiHelper.uploadedImages()
  //       console.log(result)
  //       console.log(result.data.images);
  //   } catch (error) {
        
  //   }
  // }
  // showData()



  return (
    <React.Fragment>
      <Button variant="contained" className='w-100 mt-5' onClick={handleClickOpen}>
        ADD FEATURE IMAGES
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
            <div className='showData d-flex align-items-center flex-wrap'>
            <label
                            htmlFor="file"
                            className="col-12 mb-0 col-sm-6 overflow-hidden  col-md-6   d-flex align-items-center justify-content-center"
                            style={{
                                height: "9.4rem",
                                width:"9.4rem",
                                border: "2px dashed gray",
                            }}>
                            
                                <AddAPhotoIcon className="fs-1 text-secondary"  />
                                <input
                                    onChange={(e) => {
                                        console.log(e.target.files.File)
                                        console.log(e);
                                        uploadImage(e.target.files[0])
                                    }}
                                    type="file"
                                    id="file"
                                    hidden
                                    multiple
                                />
                                </label>
              {
               image.map((x) => {

                
                return(
                  <>
                  {
                    x.mimetype === 'image' ? (
                      <img src={x.url} alt='error' className='image-fluid m-1' 
                      style={{height:"150px" , width:"150px", border: select._id === x._id ? "4px solid blue" : ""}}
                      onClick={() => {
                        if(select._id !== x._id){
                          setSelect(x)
                          console.log(select);
                        }else{
                          setSelect({})
                        }
                      }}
                      /> ) : (
                      <video  src={x.url} controls muted style={{height:"150px" , width:"150px" , objectFit:"cover"}}/>
                    )
                  }
                  </>
                )
               } ) 


              }
            </div>





            <FormControl sx={{ mt: 2, minWidth: 120 }}>
             
            </FormControl>
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setFeatureImage(select)
            setOpen(false)
          }}>Save</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}