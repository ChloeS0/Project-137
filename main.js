status="";
objects=[];
function preload()
{
  
   
    
}

function setup()
{
    canvas=createCanvas(450, 350);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    value=document.getElementById("input").value;
}

function draw()
{
image(video, 0, 0, 450, 350);
if(status != "")
{
for(i=0; i<objects.length; i++)
{
    fill("green");
    percentage=floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y);
    noFill();
    stroke("green");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}

if(objects[i].label == value)
{
video.stop();
objectDetector.detect(gotResults);
document.getElementById("status").innerHTML="object mentioned found";
var voice=window.speechSynthesis;
var voice_value="object mentioned found";
var utterThis=new SpeechSynthesisUtterance(voice_value);
voice.speak(utterThis);
}else{
    document.getElementById("status").innerHTML="object mentioned not found";
    
}

}
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}



function modelLoaded()
{
    console.log("model is loaded");
    status="true";
}