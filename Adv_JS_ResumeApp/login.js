    function disableBack() {
      
      window.history.forward();
      modal.style.display = "none"; 
      setTimeout(preventDefault(),0);
    }
    setTimeout("disableBack()", 0);

    //  window.addEventListener('popstate', (event) => {window.alert("Popped"); });
    //  onpopstate = (event) => { window.alert("Popped");modal.style.display = "none"; event.window=null;setTimeout("disableBack()", 0);};


    //UserName/Password Details
    const strLoginData = `[
      { "username":"pooja", "password":"pooja" },
      { "username":"kavya", "password":"kavya" },
      { "username":"krish","password":"krish" },
      { "username":"manu", "password":"manu" } ]
      `;

    //modal-login vars
    let modal = document.getElementById("id01");
    let loginsData;

    //on window load-parsing the local storage for login details if any
    window.onload = () => {
      const logggin = JSON.parse(localStorage.getItem("loginDeets"));
      console.log(logggin);
      modal.style.display = "block";

      //put all the login data into the object
    //   console.log("logging the data :");
      // console.log(loginsData);
      loginsData = JSON.parse(strLoginData);
    
    
      //   loginsData.forEach(showLogin);

        ///just loggin the deatils for developers
    //   function showLogin(login, index) {
    //     console.log(login.username + " index is : " + index);
    //   }
    };

    //when outside of the modal clicked, close login
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    let loggedUser,
      loggedPassw,
      loggedIn = false;
    document
      .querySelector("#username")
      .addEventListener("input", function () {
        loggedUser = this.value;

        localStorage.setItem(
          "loginDeets",
          JSON.stringify({
            username: loggedUser,
            password: btoa(loggedPassw),
            hasLoggedIn: loggedIn,
          })
        );
      });

    document
      .querySelector("#password")
      .addEventListener("input", function () {
        loggedPassw = this.value;
        
        localStorage.setItem(
          "loginDeets",
          JSON.stringify({
            username: loggedUser,
            password: btoa(loggedPassw),
            hasLoggedIn: loggedIn,
          })
        );
      });

    document
      .querySelector("#loginBtn")
      .addEventListener("click", checkCredentials);

    //check for user credentials on login button select
    function checkCredentials(event) {
      event.preventDefault();
      document.querySelector(".login-error").innerText = "";
    //   console.log(
    //     "-------------------INSIDE checkcreds---------------------------"
    //   );
      loginsData.forEach(checkUser);
      console.log("login is succssfull" + loggedIn);
      if (loggedIn === true) {
        modal.style.display = "none";
        document.querySelector(".form-login").submit();
      } else {
        document.querySelector(".login-error").innerText =
          "Error: Incorrect username/ password.";
      }
      // :console.log("Error: Incorrect username/ password.");
    }

    //checking each user if valid login
    function checkUser(login, index) {
      // let username1 = document.querySelector("#username").value; //or get it from local storage
      // let password1 = document.querySelector("#password").value;
      console.log("document.querySelector(\"#username\").value"+document.querySelector("#username").value);
      console.log("document.querySelector(\"#password\").value"+document.querySelector("#password").value);

      if(document.querySelector("#username").value===''){        
        document.querySelector(".login-error").innerText="Error";
        document.querySelector("#username").placeholder="Enter username here.";
        return false;
      } else if(document.querySelector("#password").value===''){
        document.querySelector(".login-error").innerText="Error";
        document.querySelector("#password").placeholder="Enter Password here.";
        return false;
      } else {

        let currentUser = JSON.parse(localStorage.getItem("loginDeets"));

        let username1 = currentUser.username; //from local storage
        let password1 = atob(currentUser.password); //from local storage

        console.log(
          "username types is:" + username1 
          + "password types is " + password1
        );
        let un = login.username;
        let ps = login.password;
        console.log("username is:" + un + "passwor is " + ps);
        if (un===null){
          window.alert("null logged in")
        }
        if (un===''){
          window.alert("no user logged in")
        }
        if (un==='undefined'){
          window.alert("undefined user;")
        }
        if (username1 === un && password1 === ps) {
        
          loggedIn = true; //setting true if logged in with correct un and ps
          localStorage.setItem(
            "loginDeets",
            JSON.stringify({
              username:
                loggedUser === ""
                  ? document.querySelector("#username").value
                  : loggedUser,
              password: btoa(loggedPassw),
              hasLoggedIn: true,
            })
          );
          console.log("logged in boolean is : " + loggedIn);
          return loggedIn;
        }
      }
    }