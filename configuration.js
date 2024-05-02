const mode = 1;

const host_local = "http://localhost:8080";
const host_remote = "https://c322-final-project-latest.onrender.com";

function getHost() {
    return (mode == 0) ? host_local : host_remote;
}

function isLoggedIn() {
    if(localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

function getTheToken() {
    return localStorage.getItem("token");
} 

function saveTheToken(token) {
     localStorage.setItem("token", token);
} 

function removeTheToken() {
    localStorage.removeItem("token");
} 

let configuration = {
    isLoggedIn: () => isLoggedIn(), 
    host: () => getHost(), 
    token: () => getTheToken()    
};

async function signup() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    let customer = {email:email, username: username, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/signup", request);
        if(response.status == 200) {  
            alert("The registration was successful!")
            location.href = "login.html";

        } else {
            console.log(`response status:${response.status}`);            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}



async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let customer = { username: username, password: password }
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    };
    try {
        let response = await fetch(getHost() + "/signin", request);
        if (response.status == 200) {
            alert("The login was successful");
            const token = await response.text();
            saveTheToken(token);
            localStorage.setItem("username", username);
            location.href = "index.html";
        } else {
            console.log('response status:${response.status}');
            removeTheToken();
            alert("Something wenty wrong!");
        }
    }
    catch (error) {
        console.log(error);
        removeTheToken();
        alert("Something went wrong!");
    }
}

async function logout() {   
    removeTheToken();  
}