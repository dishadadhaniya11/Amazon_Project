const Validation = (data, type) => {
    let err = []
    if(type === "register"){

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
        if(!(data.confirmpassword)){
            err.push({key:"confirmpassword",message:"Required field confirmpassword is empty"})
        }else if(!(data.confirmpassword === data.password)){
            err.push({key:"confirmpassword",message:"ConfirmPassword and Password are not match"})
        }






        

    }else if(type === "shipping"){
        if(!data.fullName){
            err.push({key:"fullName" , message:"Please enter your Fullname"})
        }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.fullName))){
            err.push({key:"fullName", message:"Fullname is Invalid"})

        }

        if(!data.Address){
            err.push({key:"Address" , message:"Please enter your Address"})
        }
        if(!data.City){
            err.push({key:"City",message:"Please enter your City name"})
        }
        if(!data.State){
            err.push({key:"State",message:"Please enter your State name"})
        }
        if(!data.Pincode){
            err.push({key:"Pincode",message:"Please enter youre area pincode"})
        }
        if(!(data.Phone)){
            err.push({key:"Phone",message:"Please enter your Phone Number"})
        }else if (!(/^\d{10}$/.test(data.Phone))){
            err.push({key:"Phone",message:"Invalid Phone Number"})
        }
        if(!data.email){
            err.push({key:"email", message:"Required field email is Empty"})
        
        }else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))){
            err.push({key:"email", message:"Email is Invalid"})

        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else{

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