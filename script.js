/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
let options = {
  inputs: ["x", "y"],
  outputs: ["label"],
  task: "classification",
  debug: true
};

var globalVar = {
  data: ""
};
var model = ml5.neuralNetwork(options);

const data = async () => {
  var thisData = document.querySelector("#texto").outerText.split("");

  for (let i = 0; i <= thisData.length; i++) {
    let options = {
      x: i,
      y: Math.floor(i / 60)
    };
    let dataOfThis = {
      label: thisData[i]
    };
    model.addData(options, dataOfThis);
  }
};
const trainModel = async () => {
  let options = {
    epochs: 400
  };
  model.normalizeData();
  model.train(options, whileTraining, finishTraining);
};
const whileTraining = async (epoch, loss) => {
  document.getElementById("epoch").innerText = epoch;
  document.getElementById("loss").innerText = loss.loss * 10;
};
const finishTraining = () => {
  alert("model trained");
};
const predictThis = () => {
  document.querySelector("#prediction").innerText = "";
  for (let i = 0; i <= 200; i++) {
    let options = {
      x: i,
      y: Math.floor(i / 60)
    };
    console.log(i);
    model.classify(options, gotResults);
  }
};
const gotResults = (error, results) => {
  if (error) {
    console.log(error);
    return;
  }
  console.dir(results);
  document.querySelector("#prediction").innerText += results[0].label;
  
  if (document.querySelector("#prediction").innerText.length%60==0){
    document.querySelector("#prediction").innerText.length+="\n"
    
  }
};

//
/*
document.querySelector("#texto").outerText.split("\n")
el maximo tamaño que deberia de tener es | 60 |
*/
