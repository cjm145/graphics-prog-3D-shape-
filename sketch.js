let slider;

function setup() {
    createCanvas(900, 800, WEBGL);
    camera(800,-600,800,0,0,0,0,1,0);
    angleMode(DEGREES);
    img = loadImage('assets/money.jpg');    //Import Image
    
    confLocs = [];
    confTheta = [];
    
    for(var i=0;i<200;i++){
        var r_x = random(-500,500);
        var r_y = random(-800,0);
        var r_z = random(-500,500);
        var r_v = createVector(r_x,r_y,r_z);
        confLocs.push(r_v);
        var r_a = random(0,360);
        confTheta.push(r_a);
    }
    
    slider = createSlider(0, 255, 100);       //Create slider to adjust the height of the box
    slider.position(50, 10);
    slider.style('width', '80px');
    
    
    slider2 = createSlider(0, 255, 100);       //Create slider2 to adjust the speed of the confetti
    slider2.position(50, 40);
    slider2.style('width', '100px');
    
    
}

function draw() {
    background(50);
    angleMode(DEGREES);
    
    //step 4:
    var xLoc = cos(frameCount)*height;
    var zLoc = sin(frameCount)*height;
    camera(xLoc,-600,zLoc,0,0,0,0,1,0);
    
    let locX = mouseX - height / 2;
    let locY = mouseY - width / 2;

    //Step 2:
    normalMaterial();
    stroke(0);
    strokeWeight(2);

    //Step1:
    for(var x = -400;x<=400;x+=50){
        for(var z = -400;z<=400;z+=50){
            push();
            translate(x,0,z);
            //step 3:
            var distance = dist(0,0,x,z)+frameCount;
            var length = map(sin(distance),-1,1,slider.value(),300);     //Slider.value of the box height
            box(50,length,50);
            
            pop();
            
        }
    }
    
    confetti();
    
}

function confetti(){
    
    noStroke();
    
    for(var i=0;i<confLocs.length;i++){
        push();
        texture(img);       //add image to texture
        translate(confLocs[i].x,confLocs[i].y,confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15,15);
        
        confLocs[i].y+=slider2.value()-30;     //Slider.value for the speed
        confTheta[i]+=10;
        
        if(confLocs[i].y>0){
            confLocs[i].y = -800;
        }
        
        pop();
    }
}
