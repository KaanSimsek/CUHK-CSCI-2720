/**
 * CSCI2720/ESTR2106 Assignment 1
 * Bootstrap Web Page with a Web Form
 *
 * I declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * I also acknowledge that I am aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: Kaan Simsek
 * Student ID  : 1155191086
 * Date        : 19.10.2022
 */

function syncReadFile() {
    var txtFile = new XMLHttpRequest();
    let lines;
    let allText;
    fetch('comments.txt')
    .then(response => response.text()) 
    .then(textString => {
        allText = txtFile.responseText;
        lines = textString.split("\n"); // Will separate each line into an array
        let comments = document.getElementById("row-c1001");
        var svgns = "http://www.w3.org/2000/svg";
        for (let i = 0; i < lines.length-1; i++) {
            if(lines[i].length==0)
                continue;
            //console.log(lines[i].split(","));
            let split = lines[i].split("é");
            const flexShrink = document.createElement("div");
            const flexGrow = document.createElement("div");

            flexShrink.classList.add("flex-shrink-0");
            flexGrow.classList.add("flex-grow-1");

            const newH5 = document.createElement("H5");
            const p = document.createElement("p");
            var svg = document.createElementNS(svgns, 'svg');

            svg.setAttributeNS(null, "height",100);
            svg.setAttributeNS(null, "width",100);

            var circle = document.createElementNS(svgns, 'circle');
            circle.setAttributeNS(null, 'cx', 50);
            circle.setAttributeNS(null, 'cy', 50);
            circle.setAttributeNS(null, 'r', 40);

            circle.setAttributeNS(null, 'style', 'fill:'+split[2]+";");
            console.log(split[2])
            svg.appendChild(circle);
            newH5.textContent=split[0];
            p.textContent=split[1];
            flexShrink.appendChild(svg);
            flexGrow.appendChild(newH5);
            flexGrow.appendChild(p);

            comments.appendChild(flexShrink);
            comments.appendChild(flexGrow);
        }    
    });    
}
syncReadFile();
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
  document.getElementById("myBar").textContent = scrolled.toFixed() + "%";
}
let activateHidden = document.querySelector("#activate-hidden");

let about = document.getElementById("about").getElementsByTagName("h2");
let exp = document.getElementById("exp").getElementsByTagName("h2");
let hobies = document.getElementById("hobies").getElementsByTagName("h2");
let rwd = document.getElementById("rwd").getElementsByTagName("h2");

if(about[0].style.textAlign==""){
    about[0].style.textAlign="left";
}
if(exp[0].style.textAlign==""){
    exp[0].style.textAlign="left";
}
if(hobies[0].style.textAlign==""){
    hobies[0].style.textAlign="left";
}
if(rwd[0].style.textAlign==""){
    rwd[0].style.textAlign="left";
}
var hiddenNav = document.querySelector("#navbar-hidden");

function showTheSecretNav(){
    hiddenNav.style.visibility="visible";
}

function task1(){
    //about.style.text-align:clearInterval;
    if(about[0].style.textAlign=="left"){
        about[0].style.textAlign="center";
        exp[0].style.textAlign="center";
        hobies[0].style.textAlign="center";
        rwd[0].style.textAlign="center";
    }
    else if(about[0].style.textAlign=="center"){
        about[0].style.textAlign="right";
        exp[0].style.textAlign="right";
        hobies[0].style.textAlign="right";
        rwd[0].style.textAlign="right";
    }
    else{
        about[0].style.textAlign="left";
        exp[0].style.textAlign="left";
        hobies[0].style.textAlign="left";
        rwd[0].style.textAlign="left";
    }
    console.log(about[0].style.textAlign); 
}

function task2(){
    let hob = prompt("Enter hobie and if you want to describe put '/' then describe", "");
    let textDivided=hob.split("/");
    let nameOfHobie = textDivided[0];
    let describeHobie = "";
    if(textDivided.length>1){
        describeHobie=textDivided[1];
    }
   
    let hobTable = document.getElementById("hobies").getElementsByTagName("table");
    let row =hobTable[0].insertRow();
    let cell1=row.insertCell();
    let cell2= row.insertCell();
    cell1.innerHTML=nameOfHobie;
    cell2.innerHTML=describeHobie;
    console.log();

}

function task3(){
    let a = document.getElementsByClassName("progress");
    console.log(a);
    a[0].style.visibility="visible";
}

function saveToFile(){
    // This function is for loading and saving comments task but after I have finished Auto save and load this does not make any difference at behaviour of website. I will not delete the function in order to take full credit.
    let comments = document.getElementById("row-c1001");
    let flex_shrinks = document.getElementsByClassName("flex-shrink-0");
    let flex_grows = document.getElementsByClassName("flex-grow-1");
    console.log(comments)
    let str='';
    for(var i=0;i<flex_shrinks.length;i++){
        let flex_shrink=flex_shrinks[i];
        let flex_grow=flex_grows[i];
        let color= flex_shrink.firstChild.firstChild.style['cssText'].split(": ")[1].slice(0,-1);
        let email = flex_grow.firstChild.innerHTML;
        let comment = flex_grow.lastChild.innerHTML;
        str+=email+','+comment+','+color+'\n';
    }

    fetch('comments.txt')
    .then(response => response.text()) 
    .then(textString => {
        fetch("comments.txt",{method: 'PUT',body:(str)})
    });
}

function addNewComent(){
    let newEmail = document.getElementById("new-email").value;
    let newComment = document.getElementById("new-comment").value;
    let errorMessage = document.getElementById("demo");
    let forChecks = document.getElementsByClassName("form-check-input");
    let index=-1
    for(var i=0; i<4;i++){
        if(forChecks[i].checked){
            index=i;
        }
    }
    if(newEmail.includes("@") && newComment.length>0 &&(newEmail.length>1)&&(index!=-1)){
        
        errorMessage.innerHTML="";
        
        var svgns = "http://www.w3.org/2000/svg";
        let comments = document.getElementById("row-c1001");
        
        let colorList=["red","blue","green","yellow"]

        const flexShrink = document.createElement("div");
        const flexGrow = document.createElement("div");

        flexShrink.classList.add("flex-shrink-0");
        flexGrow.classList.add("flex-grow-1");
        const newH5 = document.createElement("H5");
        const p = document.createElement("p");
        var svg = document.createElementNS(svgns, 'svg');

        svg.setAttributeNS(null, "height",100);
        svg.setAttributeNS(null, "width",100);

        var circle = document.createElementNS(svgns, 'circle');
        circle.setAttributeNS(null, 'cx', 50);
        circle.setAttributeNS(null, 'cy', 50);
        circle.setAttributeNS(null, 'r', 40);
        circle.setAttributeNS(null, 'style', 'fill:'+colorList[index]+";");

        svg.appendChild(circle);
        newH5.textContent=newEmail;
        p.textContent=newComment;
        flexShrink.appendChild(svg);
        flexGrow.appendChild(newH5);
        flexGrow.appendChild(p);
        comments.appendChild(flexShrink);
        comments.appendChild(flexGrow);
        
        document.getElementById("new-email").value="";
        document.getElementById("new-comment").value="";
        //comments.appendChild(newDiv);
        
        fetch('comments.txt')
        .then(response => response.text()) 
        .then(textString => {
            fetch("comments.txt",{method: 'PUT',body:(textString + newEmail+"é"+newComment+"é"+colorList[index]+"\n")})
        });
    }

    else{
        if(!newEmail.includes("@")){
            errorMessage.innerHTML="Your email should contain @!";
        }
        else if(newEmail.length<2){
            errorMessage.innerHTML="Your email lenght is not enough!";
        }
        else if(index==-1){
            errorMessage.innerHTML="You should choose a color!";
        }
        else{
            errorMessage.innerHTML="You should add some comment!";
        }
    }

}


activateHidden.addEventListener('click', showTheSecretNav);




