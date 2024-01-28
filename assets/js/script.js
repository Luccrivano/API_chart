// Objetos del DOM
const inputMonedaHtml = document.getElementById("moneda");
const selectMonedaHtml = document.getElementById("btnSeleccion");
const btnBuscarHtml = document.getElementById("btnconvertir");
const spanResultadoHtml = document.getElementById("resultado");
const ctx = document.getElementById("myChart").getContext("2d");

const ARREGLO = [12, 19, 3, 5, 2];

// https://mindicador.cl/api/{tipo_indicador}
const apiURL = "https://mindicador.cl/api/";

async function getIndicador(indicador) {
  try {
    const URL = apiURL + indicador;
    const res = await fetch(URL);
    const requestIndicador = await res.json();
    return requestIndicador;
  } catch (error) {
    alert("El error es:", error.message);
  }
}

btnBuscarHtml.addEventListener("click", () => {
  async function valorIndicador() {
    const dolarDia = await getIndicador(selectMonedaHtml.value);
    const varDolarDia = dolarDia.serie[0].valor;
    const valorInput = inputMonedaHtml.value;
    const conversionDolar = (valorInput / varDolarDia).toFixed(4);
    spanResultadoHtml.innerHTML = `Total: ${conversionDolar}`;
  }
  valorIndicador();
});

// Grafico (Hacer un ciclo para ubicar los valores de la moneda)

async function extraerValores() {
  let valores = [];
  const URL = apiURL;
  const res = await fetch(URL);
  const json = await res.json();

  json.serie.forEach((serie) => {
    if (serie.valor) {
      valores.push(serie.valor);
    }
  });

  return valores;
}

const valores = extraerValores();
console.log(valores);

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["1", "5", "10", "15", "20"], // Si tienes tiempo yo armaria un arreglo con la fecha actual - 10
    // HOy es 27 [27, 26, 25, 24, 23, etc.]
    datasets: [
      {
        label: "Indicadores",
        data: valores, // Esto debería ser los valores de la moneda
        // Ej.[980, 945, 890, etc]
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
