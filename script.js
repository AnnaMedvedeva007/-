const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");

const calculateBtn = document.getElementById("calculateBtn");

const bmiResult = document.getElementById("bmiResult");

const resultBlock = document.querySelector(".result");

calculateBtn.addEventListener("click", async function () {

  const weight = Number(weightInput.value);

  const heightCm = Number(heightInput.value);

  if (!weight || !heightCm) {

    bmiResult.textContent =
      "Пожалуйста, введите вес и рост.";

    return;
  }

  const heightMeters = heightCm / 100;

  try {

    const response = await fetch(
      "https://alexndross.pythonanywhere.com/api/bmi",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          weight: weight,
          height: heightMeters
        })
      }
    );

    const data = await response.json();

    resultBlock.classList.remove(
      "low",
      "normal",
      "overweight",
      "obesity"
    );

    if (data.bmi < 18.5) {

      resultBlock.classList.add("low");

    } else if (data.bmi < 25) {

      resultBlock.classList.add("normal");

    } else if (data.bmi < 30) {

      resultBlock.classList.add("overweight");

    } else {

      resultBlock.classList.add("obesity");
    }

    bmiResult.innerHTML = `
      <strong>Ваш ИМТ:</strong> ${data.bmi}<br><br>

      <strong>Категория:</strong> ${data.category}<br><br>

      <strong>Рекомендация:</strong> ${data.recommendation}
    `;

  } catch (error) {

    bmiResult.textContent =
      "Ошибка подключения к серверу.";

    console.log(error);
  }

});