/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
let options = {
  inputs: ["x", "y"],
  outputs: ["label"],
  task: "classification",
  debug: true
};

var model = ml5.neuralNetwork(options);
// eso agrega data a la base de datos
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
  document.querySelector("#texto").innerText = "";
};
// lo unico que hace es que empieza a entrenar el modelo
const trainModel = async () => {
  let options = {
    epochs: 400
  };
  //model.normalizeData();
  model.train(options, whileTraining, finishTraining);
};
// te dice en que generacion estas y el loss
const whileTraining = async (epoch, loss) => {
  document.getElementById("epoch").innerText = epoch;
  document.getElementById("loss").innerText = loss.loss * 10;
};
// solo avisa cuando termina
const finishTraining = () => {
  alert("model trained");
};
/*
lo que hace es repasar hacer una prediccion basica
*/
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
/*
lo unico que hace esto es visualizar los resultados y ponerlos en la consola
*/
const gotResults = (error, results) => {
  if (error) {
    console.log(error);
    return;
  }
  console.dir(results);
  document.querySelector("#prediction").innerText += results[0].label;
};
