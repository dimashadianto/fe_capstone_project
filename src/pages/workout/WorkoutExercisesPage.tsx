import { WorkoutExercise, WorkoutPlan } from "@/models/workout_model";
import { getWorkoutExercises } from "@/services/workout_service";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import exampleImage from "../../assets/example_image.png";

export default function WorkoutExercisesPage() {
  const { id } = useParams<{ id: string }>();
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const workoutPlan: WorkoutPlan = location.state;

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const fetchExercises = async () => {
      try {
        const response = await getWorkoutExercises(id);
        setExercises(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-r from-white to-blue-100">
      <div className="p-6 max-w-5xl mx-auto ">
        <h2 className="text-4xl font-extrabold text-center mb-2">
          {workoutPlan.name}
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          {workoutPlan.description}
        </p>

        <div className="space-y-10">
          {exercises.map((exercise) => (
            <div
              key={exercise.name}
              className="bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-3 gap-6 items-start"
            >
              <img
                src={exampleImage}
                // src={exercise.image_url}
                alt={exercise.name}
                className="rounded-xl w-full h-52 object-cover md:col-span-1"
              />

              <div className="md:col-span-2 space-y-3">
                <h3 className="text-2xl font-bold text-gray-800">
                  {exercise.name}
                </h3>
                <p className="text-gray-700 text-sm">{exercise.description}</p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 mt-2">
                  <p>
                    <span className="font-medium text-gray-800">
                      Muscle Group:
                    </span>{" "}
                    {exercise.muscle_group}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Sets:</span>{" "}
                    {exercise.sets}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Reps:</span>{" "}
                    {exercise.reps}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Rest:</span>{" "}
                    {exercise.rest_interval_seconds}s
                  </p>
                </div>

                {exercise.notes && (
                  <div className="mt-3 text-sm text-gray-500 italic">
                    💡 <span className="font-medium">Note:</span>{" "}
                    {exercise.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
