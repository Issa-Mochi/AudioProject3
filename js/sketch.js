let height = 1080;
let width = 1920;
let axolotl, lightning;
let click, lightningSpam = false;
let synth, dist;
let counter = 0;
let textBoolean;

function preload()
{
  axolotl = loadImage('media/29486x.jpg');
  lightning = loadImage('media/lightning.png');
}
const autoWah = new Tone.AutoWah(50, 6, -30).toDestination();
autoWah.Q.value = 6;
dist = new Tone.FeedbackDelay("32n").toDestination();
synth = new Tone.FMSynth({
  envelope: {
    attack: .005,
    decay: 0.9,
    sustain: 0.9,
    release: 3
  }
}).connect(autoWah);

synth.connect(dist);

function setup() 
{
  createCanvas(width, height);
  click = false;
}

function draw() 
{
  background(255);
  scale(2);
  image(axolotl, 0, 0);

  if(counter > 50) 
  {
    lightningSpam = false;
    click = true;
  }

  if(lightningSpam) 
  {
    if(frameCount % 8 == 0) 
    {
      click = false;
    }
    else if(frameCount % 8 == 4) 
    {
      click = true;
    }
    counter++;
  }

  if(click)
  {
    scale(1);
    image(lightning, -450, -100);
  }
  if(textBoolean)
  {
    textSize(50);
    text("I\'m seriously", (width / 12), ((height / 3) + 15));
    text("at my limit", (width / 12) + 15, (height / 3) + 65);
  }

}
function mousePressed()
{
  if(click)
  {
    click = false;
    counter = 0;
    textBoolean = false;
  }
  else
  {
    onFireSFX();
    lightningSpam = true;
    counter = 0;
    click = true;
    textBoolean = true;
  }
}

function onFireSFX()
{
  synth.triggerAttackRelease("C1", "2n");
}