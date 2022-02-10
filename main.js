function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',ModelLoaded);
}
function ModelLoaded()
{
  console.log("Mobile Net is working");
}
function draw()
{
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);

}
var presult="";

function gotResult(error,results)
{
  if(error)
  {
    console.log(error);
  }
  else{
    if((results[0].confidence>0.5)&&(presult!=results[0].label))
    {
    console.log(results);
    presult=results[0].label;
    var synth=window.speechSynthesis;
    speak_data="The object detected is "+results[0].label;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

    document.getElementById("object_name").innerHTML=results[0].label;
    document.getElementById("object_accuracy").innerHTML=results[0].confidence;
    }
  }
}

