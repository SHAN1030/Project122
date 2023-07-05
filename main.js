x = 0; 
y = 0;
screen_width = 0;
screen_height = 0;
speak_data = "";
to_number = "";
draw_apple = ""; //declare variable to set status, depending on shape drawn. They are in empty string for line 4

function preload(){
 apple = loadImage('apple.png');
 console.log("Image Loaded");
}

var SpeechRecognition = window.webkitSpeechRecognition; //This is the speech to text API
  
var recognition = new SpeechRecognition(); //variable to store a new Webspeech API

function start() //Initiates speech recognition
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start(); //Initiates the recognition of the speech. Converts speech to text.
} 
 
recognition.onresult = function(event) { //this holds on the values of the speech converted to text

 console.log(event); 

 var content = event.results[0][0].transcript; //this navigates through the data to the right content for this program

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
    console.log(to_number); //make sure the content caught the right data.

  //The if statement for the apple needs to go inside the function event.
 if(Number.isInteger(to_number)){
  document.getElementById("status").innerHTML = "Started Drawing apple(s).";
  draw_apple = "set";
 } else {
  document.getElementById("status").innerHTML = "The speech has not recognized a positive integer";
 }
}

function setup() {  //This is where we create the canvas
 screen_width = window.innerWidth;
 screen_height = window.innerHeight;
 createCanvas(screen_width, screen_height-150);
}

function draw() {  //this is where the program draws the shape on the canvas. This is supposed to draw the apples.
  if(draw_apple == "set")
  {
    for(var i=1; i <= to_number; i++)
    {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + "Apples drawn";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data = "";
}
