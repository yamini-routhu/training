var score=20;
var highScore=0;
var message='start guessing..';

var secretNumber=Math.trunc(Math.random()*20);
console.log(secretNumber);
document.querySelector('.Score').textContent="score:"+score;




function check(){
var userGuess=document.querySelector('.box').value;
if(userGuess>20){
alert('enter number between 1 & 20');
}

else if(userGuess==secretNumber){
document.querySelector('.msg').textContent='you won the game';
document.querySelector('body').style.backgroundColor='#339933';
document.querySelector('.mid').textContent=secretNumber;
document.querySelector('.highscore').textContent= 'highscore:'+score;
 if(highScore<score)    {       
 highScore=score;      
   document.getElementById( "highscore").innerHTML=score;    } 
      else{        
      document.getElementById( "highscore").innerHTML=highScore;
}


}
else{
score--;
clear();
document.querySelector('.Score').textContent="score:"+score;
if(secretNumber<userGuess){
score--;
clear();
document.querySelector('.msg').textContent='too high';
}
else if(secretNumber>userGuess){
document.querySelector('.msg').textContent='too low';
}
else if(userGuess==" "){
alert("enter any value");
}
else if(typeof(userGuess)=='string'){
alert("enter the number");
}

console.log('guess again');
}

}

function Again(){
document.querySelector('body').style.backgroundColor='black';
document.querySelector('.mid').textContent='?';
score=20;
document.querySelector('.Score').textContent="score:"+score;
 userGuess=document.querySelector('.box').value=" ";
document.querySelector('.msg').textContent='start guessing';
secretNumber=Math.trunc(Math.random()*20);
console.log(secretNumber);
}
function clear(){
document.querySelector('.box').value=" ";
}
