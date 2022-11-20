function validateForm() {
    if (fname.value == "", lname.value == "", email.value == "", number.value == "", address.value == "", city.value == "", zip.value == "") {
        alert('Please Fill the Checkout Form!');
        checkoutDOM.scrollIntoView();
        return false;
    } else if (fname.value == "") {
        alert('Please Enter Your First Name');
        fname.focus();
        return false;
    } else if (lname.value == "") {
        alert('Please Enter Your Last Name');
        lname.focus();
        return false;
    } else if (email.value == "") {
        alert('Please Enter Your Email Address!');
        email.focus();
        return false;
    } else if (number.value == "") {
        alert('Please Enter Your Contact Number!');
        number.focus();
        return false;
    } else if (city.value == "") {
        alert('Please Enter Your City!');
        city.focus();
        return false;
    } else if (zip.value == "") {
        alert('Please Enter Your Postal Code!');
        zip.focus();
        return false;
    } else if (captcha.value == "") {
        alert("Check I'm Not a Robot");
        captcha.focus();
        return false;
    } else if (email.value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            return true;
        } else {
            alert('Please Enter a Valid Email Address!');
            email.focus();
            return false;
        }

    } else {
        return true;
    }
}