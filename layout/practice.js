



const API_BASE_URL="";
const USERS=`${API_BASE_URL}users`;
let users=[]
async function getUsers(){
    try{
        let response= await fetch(USERS);
        if(response.status!==200) throw(e);
        users= await response.json();
        console.log(users);
    }
catch{
    console.log(error);
}
    }
getUsers();