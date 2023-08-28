import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import apiHelper from '../../Common/Apihelper';
import Validation from '../../Common/Validation';
import { FormControl, FormHelperText } from '@mui/material';
// import { Message } from '@mui/icons-material';
// import AlertBox from '../AlertBox/AlertBox';

export default function MenageUser(props) {
  const {open, setOpen ,userDetails , setUserDetails,getUser ,updateUser } = props
  const [Error , setError] = useState([])
  const [isSubmited, setisSubmited] = useState(false)
  // const [adduser , setAdduser] = useState({
  //   fullName: "",
  //   email: "",
  //   role:"",
  //   password: ""
  // })
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
  const handleClose = () => {
    setError([])
    setOpen(false);
  };


  const addUser  = async () => {
    try {
      setisSubmited(true)
       const validationresult = Validation(userDetails,"adduser")
       if(validationresult.length > 0){
        setError(validationresult)
        return
       }
        const result = await apiHelper.insertUser(userDetails)
        if(result){
          setOpen(false)
          getUser()
          // {<AlertBox/>}
          alert("User insert Successfully")
        }

    } catch (error) {
        console.log(error);
        
    }
  }




  return (
    <div>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{userDetails._id? "Update user" : "Add User"}</DialogTitle>
        <hr className='my-0'/>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="email"
            fullWidth
            helperText = {Error.find((x) => x.key === "fullName" )?.message}
            error={Error.find((x) => x.key === "fullName")}
            onChange={(e) =>  {
              setUserDetails({...userDetails,fullName:e.target.value})
              if (isSubmited) {
                const validationresult = Validation({...userDetails,fullName:e.target.value} , "adduser")
                setError(validationresult)
              }
            }}
            value={userDetails.fullName}
            // variant="standard"
            variant='outlined'
          />
          <TextField  
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            helperText = {Error.find((x) => x.key === "email" )?.message}
            error={Error.find((x) => x.key === "email")}
             onChange={(e) =>  {
               setUserDetails({...userDetails,email:e.target.value})
               if(isSubmited){
                const validationresult = Validation({...userDetails,email:e.target.value} , "adduser")
                setError(validationresult)
               }

             }}
            // variant="standard"
            variant='outlined'
          />
           <FormControl sx={{mt:1, minWidth:120}} fullWidth>
          <Select
          fullWidth
          margin="dense"    
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          helperText = {Error.find((x) => x.key === "role" )?.message}
          error={Error.find((x) => x.key === "role")}
           onChange={(e) =>  {
             setUserDetails({...userDetails,role:e.target.value})
             if(isSubmited){
              const validationresult = Validation({...userDetails,role:e.target.value} , "adduser")
              setError(validationresult)
             }
           

           }}
           value= {userDetails.role}
        >
          
          <MenuItem value={"0"}><i>--Select Role--</i></MenuItem>
          <MenuItem value={"editor"}>Editor</MenuItem>
          <MenuItem value={"Admin"}>Admin</MenuItem>
          <MenuItem value={"sco"}>SCO</MenuItem>
        
          </Select>
          <FormHelperText error={Error?.some(x => x.key === "role")}>{Error.find(x => x.key === "role")?.message}</FormHelperText>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            helperText = {Error.find((x) => x.key === "password" )?.message}
            error={Error.find((x) => x.key === "password")}
             onChange={(e) =>  {
               setUserDetails({...userDetails,password:e.target.value})
               if(isSubmited){
                const validationresult = Validation({...userDetails,password:e.target.value} , "adduser")
                setError(validationresult)
               }

             }}
            value={userDetails.password}
            // variant="standard"
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={userDetails._id ? updateUser : addUser}>{userDetails._id ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}