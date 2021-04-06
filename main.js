previous1 = "";

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);
  }

  function modelLoaded(){
    console.log('Model Loaded!');
  }
  
  
  function draw() {
    image(video, 0, 0, 300, 300);
   classifier.classify(video, gotResult);
  }
  
   function gotResult(error, results) {
   if(error){
     console.error(error);
   } else {
    if(results[0].confidence > 0.5 && previous1 != results[0].label){
      console.log(results);
      previous1 = results[0].label;
      var snth = window.speechSynthesis;
      speak_Data = "object detected is "+ results[0].label;
      var ut = new SpeechSynthesisUtterance(speak_Data);
      snth.speak(ut); 

      document.getElementById("r1").innerHTML = results[0].label;
      document.getElementById("r2").innerHTML = results[0].confidence.toFixed(3);

    }
   }
   }