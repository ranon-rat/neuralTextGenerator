/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
let options = {
  inputs: ["x", "y"],
  outputs: ["label"],
  task: "classification",
  debug: true
};
var dataOfThis = ""
var model = ml5.neuralNetwork(options);

const data = () => {
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
const trainModel = () => {
  let options = {
    epochs: 200
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
  dataOfThis = "";
  for (let i = 0; i <= 200; i++) {
    let options = {
      x: i,
      y: Math.floor(i / 60)
    };
    console.log(i)
    model.classify(options, gotResults);
  }
  document.querySelector("#prediction").innerText=dataOfThis
};
const gotResults = (error, results) => {
  if (error) {
    console.log(error);
    return;
  }
  console.dir( results)
  dataOfThis += results[0].label;
};

//
/*
document.querySelector("#texto").outerText.split("\n")
el maximo tamaño que deberia de tener es | 60 |
*/
