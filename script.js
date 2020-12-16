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
const trainModel = ()=>{
  let options = {
        epochs: 200
      };
      model.normalizeData();
      model.train(options, whileTraining, finishTraining);
}
const whileTraining=()=>{}

//
/*
document.querySelector("#texto").outerText.split("\n")
el maximo tamaño que deberia de tener es | 60 |
*/
