import React, { useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Validation from '../../Common/Validation';
import { TextField } from '@mui/material';

// import Path from '../../Common/Path';
import { useNavigate } from 'react-router-dom';
import apiHelper from '../../Common/Apihelper';
import Path from '../../Common/Path';

export default function LoginScreen(props) {

    const { Auth,setAuth } = props

    const [showPassword, setShowPassword] = useState(false);
    const Navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [open, setOpen] = useState(true);
    const [isSubmited, setIsSubmited] = useState(false)
    const [loginError, SetLoginError] = useState([])
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    console.log(user);
    useEffect(() => {
        const token = localStorage.getItem("TOKEN")
      if (token) {
        Navigate(Path.Dashboard)
      }
    },[])

    const LoginHandler = async () => {
        try {
            setIsSubmited(true)
            const ValidatioResult = Validation(user, "login")

            if (ValidatioResult.length > 0) {
                SetLoginError(ValidatioResult)
                return
            }

            const result = await apiHelper.loginUser(user)
            const token = result.data.user.token
            localStorage.setItem("TOKEN", JSON.stringify(token))
            localStorage.setItem("userInfo",JSON.stringify(result.data.user))
            setAuth(true)

            Navigate(Path.Dashboard)
            return

        } catch (error) {
            setAuth(false)
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data.message === "Validation Error") {
                    SetLoginError(error.response.data.ValidationResult)
                    return
                }
            }
        }
    }
    if(Auth){
        return <Navigate to="/user" />
    }

    return (
        <div>


            <div>
                <Dialog open={open}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent className='d-flex flex-column'>
                        <FormControl sx={{ m: 2, width: '40ch' }} variant="outlined">
                            <TextField
                                error={loginError?.find(x => x.key === "email")}
                                id="outlined-adornment-password"
                                type={"email"}
                                label="Email"
                                helperText={loginError?.find(x => x.key === "email")?.message}
                                onChange={(e) => {
                                    setUser({ ...user, email: e.target.value })
                                    if (isSubmited) {
                                        const ValidatioResult = Validation({ ...user, email: e.target.value })
                                        SetLoginError(ValidatioResult)
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 2, width: '40ch' }} variant="outlined">
                            <TextField
                                error={loginError?.find(x => x.key === "password")}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          edge="end"
                                        >
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                label="Password"
                                helperText={loginError?.find(x => x.key === "password")?.message}
                                onChange={(e) => {
                                    setUser({ ...user, password: e.target.value })
                                    if (isSubmited) {
                                        const ValidatioResult = Validation({ ...user, password: e.target.value })
                                        SetLoginError(ValidatioResult)
                                    }
                                }}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button >Cancel</Button>
                        <Button onClick={LoginHandler} >Login</Button>
                    </DialogActions>
                </Dialog>
            </div>



        </div>
    )
}