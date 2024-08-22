var login=document.getElementById("Login");
var signup=document.getElementById("Signup");
//creating firebase config, directly copying and pasting from firebase console...
const firebaseConfig = {
    apiKey: "AIzaSyB8aDyS4uVLsHzwUZCIrOOC7DgnBATD1_0",
    authDomain: "flybuy-9be59.firebaseapp.com",
    databaseURL: "https://flybuy-9be59-default-rtdb.firebaseio.com",
    projectId: "flybuy-9be59",
    storageBucket: "flybuy-9be59.appspot.com",
    messagingSenderId: "867088170224",
    appId: "1:867088170224:web:dcb398b9259202c36a1635"
  };

//initializing firebase database
firebase.initializeApp(firebaseConfig);
// adding evenlistner on cicking signup button
signup.addEventListener('submit',(e)=>
{
    //removing default action of form - auto reloading
    e.preventDefault();
    //accessing values
    var name=document.getElementById('sname').value;
    var email=document.getElementById('semail').value;
    var pass=document.getElementById('spassword').value;
    var redg=document.getElementById("redg").value;
    //creating reference for the person details
    var details = firebase.database().ref("Info").child(name);
    //passing values to database 
    var ref=firebase.database().ref("Info");
    ref.on("value",function(data)
    {
        // accessing values inside "Info/<name>" object
        var Info=data.val();
        var keys=Object.keys(Info);
        if(!keys.includes(name))
        {
            details.set(
                {
                name: name,
                email: email,
                password: pass,
                number:redg,
                });
            //resetting the form after submitting
            window.alert("Signup success");
            signup.reset();
            
        }
        else
        {
            window.alert("User Already registered");
            signup.reset();
        } 
    })
})
//function to check if user is already logged in or not
login.addEventListener("submit",(e)=>
{
    e.preventDefault();
    var name=document.getElementById("lname").value;
    var lpass=document.getElementById("lpassword").value;
    //creating reference for data inside "Info" object
    var ref=firebase.database().ref("Info");
    ref.on("value",function(data)
    {
        //accessing values inside "Info/<name>" object
        var Info=data.val();
        var keys=Object.keys(Info);
        if(keys.includes(name) && Info[name]["password"]==lpass)
        {
            console.log("success")
            window.alert("login success");
            localStorage.setItem('user-name',name);
            localStorage.setItem('user-email',Info[name]["email"]);
            localStorage.setItem('user-number',Info[name]["number"]);
            window.location.assign("flybuy.html");
            login.reset();
        }
        else
        {
            window.alert("Login Failed");
            login.reset();
        }
    })
})

var login_block=document.getElementById("login_block");
var sign_up_block=document.getElementById("sign_up_block");

var signup_btn=document.getElementById("tosignup");
var login_btn=document.getElementById("tologin");

signup_btn.addEventListener("click",()=>
{
    login_block.classList.replace("left-[0%]","left-[100%]");
    sign_up_block.classList.replace("right-[100%]","right-[0%]");
})

login_btn.addEventListener("click",()=>
{
    login_block.classList.replace("left-[100%]","left-[0%]");
    sign_up_block.classList.replace("right-[0%]","right-[100%]");
})