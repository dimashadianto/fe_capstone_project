import React, { useState } from "react";
import axios from "axios";

export default function BMICalorieCalculator() {
  const [age, setAge] = useState(20);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [gender, setGender] = useState("male");
  const [resultType, setResultType] = useState<"bmi" | "calorie">("bmi");

  const [bmiResult, setBmiResult] = useState<any>(null);
  const [calorieResult, setCalorieResult] = useState<any>(null);

  const handleSubmit = async () => {
    try {
      if (resultType === "bmi") {
        const res = await axios.post("http://localhost:8080/api/bmi", {
          tinggi: height,
          berat: weight,
        });
        setBmiResult(res.data);
      } else {
        const res = await axios.post("http://localhost:8080/api/calorie", {
          usia: age,
          tinggi: height,
          berat: weight,
          gender,
        });
        setCalorieResult(res.data);
      }
    } catch (err) {
      alert("Failed to fetch result.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen">
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            resultType === "bmi" ? "bg-blue-400 text-white" : "bg-white text-blue-400"
          }`}
          onClick={() => setResultType("bmi")}
        >
          BMI
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            resultType === "calorie" ? "bg-blue-400 text-white" : "bg-white text-blue-400"
          }`}
          onClick={() => setResultType("calorie")}
        >
          Calorie
        </button>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-md w-full max-w-4xl flex flex-col md:flex-row">
        <div className="md:w-1/2 space-y-4">
          {resultType === "calorie" && (
            <div>
              <label className="block font-medium">Age</label>
              <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="input" />
            </div>
          )}
          <div>
            <label className="block font-medium">Gender</label>
            <div className="flex space-x-4">
              <label><input type="radio" checked={gender === "male"} onChange={() => setGender("male")} /> Male</label>
              <label><input type="radio" checked={gender === "female"} onChange={() => setGender("female")} /> Female</label>
            </div>
          </div>
          <div>
            <label className="block font-medium">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="input" />
          </div>
          <div>
            <label className="block font-medium">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="input" />
          </div>
          <button onClick={handleSubmit} className="mt-4 px-6 py-2 bg-blue-400 text-white rounded-xl shadow">Calculate</button>
        </div>

        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
          {resultType === "bmi" && bmiResult && (
            <div className="bg-blue-100 p-4 rounded-xl">
              <p><strong>BMI:</strong> {bmiResult.bmi} kg/m²</p>
              <p><strong>Category:</strong> {bmiResult.category}</p>
              <p><strong>Healthy BMI range:</strong> {bmiResult.healthy_bmi_range}</p>
              <p><strong>Healthy weight range:</strong> {bmiResult.healthy_weight_range}</p>
              <p><strong>Ponderal Index:</strong> {bmiResult.ponderal_index}</p>
            </div>
          )}
          {resultType === "calorie" && calorieResult && (
            <div className="bg-blue-100 p-4 rounded-xl">
              <p><strong>Basal Metabolic Rate (BMR):</strong> {calorieResult.bmr}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
