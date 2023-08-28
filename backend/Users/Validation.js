const Validation = (data, type) => {

    let err = []

    if(type === "registration"){

        if(!data.firstName){
            err.push({key:"firstName", message:"Required field Firstname is Empty"})
        
        }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))){
            err.push({key:"firstName", message:"Firstname is Invalid"})

        }

        // if(!data.lastName){
        //     err.push({key:"lastName", message:"Required field Lastname is Empty"})
        
        // }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))){
        //     err.push({key:"lastName", message:"Lastname is Invalid"})

        // }

        if(!data.email){
            err.push({key:"email", message:"Required field email is Empty"})
        
        }else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))){
            err.push({key:"email", message:"Email is Invalid"})

        }

        if(!data.password){
            err.push({key:"password", message:"Required field password is Empty"})
        
        }else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(data.password))){
            err.push({key:"password", message:"Password to weak, make it strong"})

        }


    }else{

        if(!data.email){
            err.push({key:"email", message:"Required field email is Empty"})
        
        }else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))){
            err.push({key:"email", message:"Email is Invalid"})

        }

        if(!data.password){
            err.push({key:"password", message:"Required field password is Empty"})
        
        }else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(data.password))){
            err.push({key:"password", message:"Password to weak, make it strong"})

        }
    }
    return err

}

export default Validation