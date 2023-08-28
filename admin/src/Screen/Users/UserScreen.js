

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import apiHelper from '../../Common/Apihelper';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenageUser from './MenageUser';





export default function ProductScreen() {
    const [user, setuser] = useState([])
    const [open, setOpen] = useState(false)
    const users = {
        fullName: "",
        email: "",
        role: "0",
        password:""
    }
    const [userDetails, setUserDetails] = useState(users)

    async function getUser() {
        try {
            const result = await apiHelper.AdminUserLogin()
            setuser(result.data.user)


        } catch (error) {
            console.log(error)
        }
    }

    async function removeUser(id) {
        try {
            const result = await apiHelper.deletUser(id)
            if (result.status === 200) {
                getUser()
            }
        } catch (error) {

        }
    }

    async function updateUser(){
        try {
            const result = await apiHelper.updateUser(userDetails._id,userDetails)
            console.log(result);
            setOpen(false)
            setUserDetails({
                fullName: "",
                email: "",
                role: "0",
                password:""
            })
            getUser()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    }, [])

    // console.log(user.cell);

    const columns = [
        { field: '_id', headerName: 'ID', flex: 1 },
        { field: 'fullName', headerName: 'First name', width: 100 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'role', headerName: "Role", width: 100 },
        {
            field: 'action', headerName: "Actions", flex: 1, renderCell: (cell) => {
                return <>
                    <IconButton color='primary' onClick={() => {
                        setUserDetails(cell.row)
                        setOpen(true)
                    }}>
                        <EditIcon />
                    </IconButton>

                    <IconButton color='error' onClick={() => {
                        removeUser(cell.row._id)
                    }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            }
        }

    ];
    return (
        <>
            <MenageUser updateUser={updateUser} open={open} getUser={getUser} setOpen={setOpen} userDetails={userDetails} setUserDetails={setUserDetails} />
            <div className='row'>
                <div className='d-flex justify-content-between mb-3'>
                    <h4 className='p-2'>Show & manage User</h4>
                    <Button onClick={() => {
                        // setUserDetails(users)
                        setOpen(true)
                    }} variant='outlined'>Add user</Button>
                </div>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={user}
                        columns={columns}
                        getRowId={(e) => e._id}
                        pageSizeOptions={[5, 10]}
                        autoHeight={true}
                    />
                </div>
            </div>
        </>
    );
}