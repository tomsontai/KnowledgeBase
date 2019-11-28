function validatePasswordInput() {
    var pw = document.forms["register"]["password"].value;
    var pwConfirm = document.forms["register"]["confirmPassword"].value;
    if (pw !== pwConfirm) {
        alert("wrong");
        return false;
    }
}