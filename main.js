img =""
status =""
objects = [];

function setup()
{
    canvas = createCanvas(500,450);
    canvas.center()
    //its Loading cocossd
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded()
{
    status=true
    console.log("Model Loaded!")
    //running the module here. The img is input, the output is the gotResult
    objectDetector.detect(img, gotResult)
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error)
    }
    console.log(results)
    objects = results;
}

function preload()
{
    img = loadImage('dog_cat.jpg')
}

function draw()
{
    image(img, 0, 0, 500, 450)
    if(status  != "")
    {
        for(i = 0; i <objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : object Detected";
            fill("red")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
   
}