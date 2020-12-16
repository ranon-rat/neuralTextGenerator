/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
let options = {
  inputs: ["x", "y"],
  outputs: ["label"],
  task: "classification",
  debug: true,
};

var model = ml5.neuralNetwork(options);
// eso agrega data a la base de datos
const data = async () => {
  var thisData = document.querySelector("#texto").outerText.split("");
  console.log("more data");
  for (let i = 0; i <= thisData.length; i++) {
    let options = {
      x: i % 60,
      y: Math.floor(i / 60) + 1,
    };
    let dataOfThis = {
      label: thisData[i],
    };
    model.addData(options, dataOfThis);
  }
  document.querySelector("#texto").innerText = "";
};
// lo unico que hace es que empieza a entrenar el modelo
const trainModel = () => {
  let options = {
    epochs: 200,
  };

  model.train(
    options,
    (epoch, loss) => {
      document.getElementById("epoch").innerText = epoch;
      document.getElementById("loss").innerText = loss.loss;
    },
    () => {
      alert("model trained");
    }
  );
};
// te dice en que generacion estas y el loss

// solo avisa cuando termina

/*
lo que hace es repasar hacer una prediccion basica
*/
const predictThis = () => {
  document.querySelector("#prediction").innerText = "";
  for (let i = 0; i <= 50; i++) {
    let options = {
      x: i % 60,
      y: Math.floor(i / 60) + 1,
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
  if (results[0].label != undefined) {
    document.querySelector("#prediction").innerText += results[0].label;
  }
};
