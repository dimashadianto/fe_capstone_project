import api from "./api";

export const getCategories = async () => {
  return api.get("workouts/categories");
};

export const getWorkoutPlans = async (categoryId: string | number) => {
  return api.get(`workouts/plans/${categoryId}`);
};

export const getWorkoutExercises = async (workoutPlanId: string | number) => {
  return api.get(`workouts/exercises/${workoutPlanId}`);
};
