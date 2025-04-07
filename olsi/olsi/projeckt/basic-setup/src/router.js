import home from "./home";
import about from "./about";

export default function router(){
    const mainDiv=document.getElementById("app");
    mainDiv.innerHTML="";
    const route=window.location.hash.slice(1);  
    switch (route){
        case 'about':
            mainDiv.appendChild(about());
            break
        case 'home':
            mainDiv.appendChild(home());
            break    
    }
}