song = "";
song2 = "";

LeftWristX = 0;
LeftWristY = 0 ;
RightWristX = 0;
RightWristY = 0;

leftWristScore = 0;
rightWristScore = 0;

songStatus = "";

function preload(){
song2  = loadSound("music.mp3");
song = loadSound("music2.mp3");
}

 function setup(){
  canvas = createCanvas(650, 450);
  canvas.position(320, 250);
  video  = createCapture(VIDEO);
  video.hide();
  posenet = ml5.poseNet(video, modelLoaded);
  posenet.on('pose', gotPoses);
 }

function gotPoses(results){
if(results.length > 0){
 console.log(results);
 LeftWristX = results[0].pose.leftWrist.x;
 LeftWristY = results[0].pose.leftWrist.y;
 console.log("left wrist X position = " + 
 LeftWristY + ", left wrist Y position = " + LeftWristY);

 RightWristX = results[0].pose.rightWrist.x;
 RightWristY = results[0].pose.rightWrist.y;
 console.log("right wrist X position = " + RightWristX + ", right wrist Y position = " + RightWristY);

 leftWristScore = results[0].pose.keypoints[9].score;
 rightWristScore = results[0].pose.keypoints[10].score;
}
}
 function modelLoaded() {
     console.log("Posenet has been initialized.");
 }
 function draw(){
     image(video, 0, 0, 650, 450);

     fill("#ff0400");
     

     if(rightWristScore > 0.2){

        circle(rightWristX, rightWristY, 20);

        if(RightWristY > 0 && rightWristY <= 300 && RightWristX > 0 && RightWristX <= 300){
           
             song.play()
             song.setVolume(0.5)
             song.setRate(1)
             document.getElementById("song").innerHTML = "Song = Song 1";
        }
     }

     if(leftWristScore > 0.2){

        circle(leftWristX, leftWristY, 20);

        if(leftWristY > 0 && leftWristY <= 300 && leftWristX > 0 && leftWristX <= 300){
           
             song2.play()
             song2.setVolume(0.5)
             song2.setRate(1)
             document.getElementById("song").innerHTML = "Song = Peter Pan";

        }
     }
 }


