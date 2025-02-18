document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const confirmPasswordInput = document.getElementById("loginConfirmPassword");
    
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    const showHideButton = document.getElementById("show-hide");
    
    // Add Listeners
    loginForm.addEventListener("submit", function(event){
        event.preventDefault();
        ValidateForm();
    });
    
    emailInput.addEventListener("blur", function(){
        ValidateEmail();
    });

    emailInput.addEventListener("change", function(){
        ClearError(emailError);
    });

    passwordInput.addEventListener("change", function(){
        ClearError(passwordError);
    });

    confirmPasswordInput.addEventListener("change", function(){
        ClearError(confirmPasswordError);
    });

    showHideButton.addEventListener("click",function(){
        if(passwordInput.type == password){
            passwordInput.type = "text";
            confirmPasswordInput.type = "text";
        }else{
            passwordInput.type = "password";
            confirmPasswordInput.type = "password";
        }
    });

    //Funciones
    function ValidateForm(){
        const isValidateEmail = ValidateEmail();
        const isValidPassword = ValidatePassword();
        const passwordMatch = PasswordMatch();
        if(isValidateEmail && isValidPassword && passwordMatch){
            SaveLocalStorage();
            alert("Has ingresado con exito.");
        }
    }

    function ValidateEmail(){
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim();
        if(!emailRegex.test(emailValue)){
            ShowError(emailError, "*Ingresa un correo electronico valido.");
            return false;
        }
        return true;
    }

    function ValidatePassword(){
        const passwordValue = passwordInput.value.trim();
        if(passwordValue.length < 6){
            ShowError(passwordError, "*Ingresa una contraseña de al menos 6 caracteres.");
            return false;
        }
        return true;
    }

    function PasswordMatch(){
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        if(passwordValue != confirmPasswordValue){
            ShowError(confirmPasswordError, "*Las contraseñas no coinciden.");
            return false;
        }
        return true;
    }

    function ShowError(errorElement, message){
        errorElement.innerHTML = message;
        errorElement.style.display = "block"; 
    }

    function ClearError(errorElement){
        errorElement.innerHTML = "";
        errorElement.style.display = "none"; 
    }
    function SaveLocalStorage(){
        const emailValue = emailInput.value.trim();
        localStorage.setItem("email", emailValue);
        //TODO: Json
        const body = BodyBuilderJSON();
        console.log(body);
    }
    function BodyBuilderJSON(){
        return{
            "email" : emailInput.value,
            "password" : passwordInput.value
        }
    }
});
