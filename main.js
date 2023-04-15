song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(450, 200);

    video = createCapture(VIDEO);
    video.hide();

    myposenet = ml5.poseNet(video, modelLoaded);
    myposenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Posenet is Loaded! ");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;

        console.log("LWScore = " + leftWristScore);
        console.log("RWScore = " + rightWristScore);
    }
}

function draw() {
    image(video, 0, 0, 600, 450);

    fill("pink");

    if (rightWristScore > 0.2) {
        circle(rightWristX, rightWristY - 10, 25); //circle

        if (rightWristY > 0 && rightWristY <= 150) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 150 && rightWristY <= 250) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rightWristY > 250 && rightWristY <= 350) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 350 && rightWristY <= 450) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
    }

    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY - 10, 25); //circle

        NumberLeftWristY = Number(leftWristY);
        removedecimals = floor(NumberLeftWristY);
        Updatedvolume = (removedecimals / 450).toFixed(3);

        document.getElementById("volume").innerHTML = "Volume = " + Updatedvolume;
        song.setVolume(Updatedvolume);
    }
}

function playmusic() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}