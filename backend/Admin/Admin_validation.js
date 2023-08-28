const Validation = (data, type) => {

    const err = []

    const { fullName, email, role,password, } = data

    if (type === "adduser") {

        // For FirstName 
        if (!fullName) {
            err.push({ key: "fullName", message: "Please Enter FirstName" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(fullName))) {
            err.push({ key: "firstName", message: "Invalid firstName" })
        }
        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        if(!role){
            err.push({key:"role",message:"Please select Role of user"})
        }

        // For Password
        // if (!password) {
        //     err.push({ key: "password", message: "Please Enter password" })
        // }
        // else if (!(/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/.test(password))) {
        //     err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        // }

        // //For ConfromPassword
        // if (!ConfirmPassword) {
        //     err.push({ key: "ConfirmPassword", message: "Requird To feild Confirm-Password" })
        // }
        // if (!(ConfirmPassword === password)) {
        //     err.push({ key: "ConfirmPassword", message: "Password Not Match" })
        // }
    }  else {
        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%#*?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }
    }

    return err
}

export default Validation