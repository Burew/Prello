function validateUserForm( element1, element2 ){
	var password1 = document.getElementById(element1).value;
	var password2 = document.getElementById(element2).value;
	return password1 === password2;
}

document.querySelector("#create-account-form").addEventListener('submit', function(e){
	if (!validateUserForm("create-password", "create-confirm-password")){
		e.preventDefault();
		alert("Passwords for account creation do not match");
	}
});

document.querySelector("#login-form").addEventListener('submit', function(e){
	if (!validateUserForm("login-password", "login-confirm-password")){
		e.preventDefault();
		alert("Passwords for Login do not match");
	}
});