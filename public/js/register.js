function validatePasswordInput() {
    var pw = document.forms["register"]["password"].value;
    var pwConfirm = document.forms["register"]["confirmPassword"].value;
    if (pw !== pwConfirm) {
        alert("Password don't match, please renter");
        document.forms["register"]["password"].value = "";
        document.forms["register"]["confirmPassword"].value = "";
        return false;
    }
} 