import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function BMICalorieCalculator() {
  const [tab, setTab] = useState<"bmi" | "calorie">("bmi");

  // form states stored as string to allow blank ("") without becoming 0
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");

  // results
  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    category: string;
    bmiRange: string;
    weightRange: string;
    ponderal: string;
  } | null>(null);
  const [bmrResult, setBmrResult] = useState<number | null>(null);

  /* ------------------------------- UTILS -------------------------------- */
  const toNum = (value: string) => parseFloat(value.replace(/,/g, "")); // handle comma

  /* ----------------------------- CALCULATE ------------------------------ */
  const calculateBMI = () => {
    const h = toNum(height);
    const w = toNum(weight);
    if (!h || !w) return; // simple guard, or show alert

    const heightM = h / 100;
    const bmi = +(w / (heightM ** 2)).toFixed(1);
    const category = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";

    const bmiRange = "18.5 - 24.9 kg/m²";
    const minHealthy = (18.5 * heightM ** 2).toFixed(1);
    const maxHealthy = (24.9 * heightM ** 2).toFixed(1);
    const weightRange = `${minHealthy} kg - ${maxHealthy} kg`;
    const ponderal = (w / Math.cbrt(heightM ** 3)).toFixed(1) + " kg/m³";

    setBmiResult({ bmi, category, bmiRange, weightRange, ponderal });
  };

  const calculateBMR = () => {
    const a = toNum(age);
    const h = toNum(height);
    const w = toNum(weight);
    if (!a || !h || !w) return;

    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    setBmrResult(Math.round(bmr));
  };

  /* ------------------------------- RENDER -------------------------------- */
  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-white to-blue-200">
        <div className="container mx-auto px-4 py-10">
          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-6">
            {["bmi", "calorie"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t as "bmi" | "calorie")}
                className={`px-4 py-2 rounded-full font-semibold shadow transition-colors ${tab === t ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
              >
                {t === "bmi" ? "BMI" : "Calorie"}
              </button>
            ))}
          </div>

          {/* BMI Tab */}
          {tab === "bmi" && (
            <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-start gap-8 justify-center">
              {/* Form */}
              <div className="w-full max-w-sm space-y-4">
                {/* Gender */}
                <div>
                  <label className="block font-medium mb-1">Gender</label>
                  <div className="flex gap-6">
                    {["male", "female"].map((g) => (
                      <label key={g} className="flex items-center gap-2">
                        <input type="radio" checked={gender === g} onChange={() => setGender(g as any)} />
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label className="block font-medium mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 170"
                    className={inputClass}
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block font-medium mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 65"
                    className={inputClass}
                  />
                </div>

                <button onClick={calculateBMI} className="mt-4 px-6 py-2 rounded-xl bg-blue-500 text-white shadow hover:bg-blue-600">
                  Calculate
                </button>
              </div>

              {/* Result */}
              {bmiResult && (
                <div className="bg-blue-100 p-6 rounded-2xl shadow max-w-md">
                  <p className="font-semibold mb-2"><strong>BMI:</strong> {bmiResult.bmi} kg/m²</p>
                  <p><strong>Category:</strong> {bmiResult.category}</p>
                  <p><strong>Healthy BMI range:</strong> {bmiResult.bmiRange}</p>
                  <p><strong>Healthy weight range:</strong> {bmiResult.weightRange}</p>
                  <p><strong>Ponderal Index:</strong> {bmiResult.ponderal}</p>
                </div>
              )}
            </div>
          )}

          {/* Calorie Tab */}
          {tab === "calorie" && (
            <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-start gap-8 justify-center">
              {/* Form */}
              <div className="w-full max-w-sm space-y-4">
                {/* Age */}
                <div>
                  <label className="block font-medium mb-1">Age (years)</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 20" className={inputClass} />
                </div>

                {/* Gender */}
                <div>
                  <label className="block font-medium mb-1">Gender</label>
                  <div className="flex gap-6">
                    {["male", "female"].map((g) => (
                      <label key={g} className="flex items-center gap-2">
                        <input type="radio" checked={gender === g} onChange={() => setGender(g as any)} />
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label className="block font-medium mb-1">Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170" className={inputClass} />
                </div>

                {/* Weight */}
                <div>
                  <label className="block font-medium mb-1">Weight (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 65" className={inputClass} />
                </div>

                <button onClick={calculateBMR} className="mt-4 px-6 py-2 rounded-xl bg-blue-500 text-white shadow hover:bg-blue-600">
                  Calculate
                </button>
              </div>

              {/* Result */}
              {bmrResult !== null && (
                <div className="bg-blue-100 p-6 rounded-2xl shadow max-w-md">
                  <p className="font-semibold mb-2"><strong>Basal Metabolic Rate (BMR):</strong> {bmrResult}</p>
                  <p className="text-sm text-gray-700 mt-2">
                    BMR adalah jumlah kalori minimal yang diperlukan tubuh untuk mempertahankan fungsi vital (bernapas, sirkulasi darah, dll.) dalam keadaan istirahat total
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Mifflin-St Jeor Equation
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Male: BMR = 10W + 6.25H - 5A + 5
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Female: BMR = 10W + 6.25H - 5A - 161
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
