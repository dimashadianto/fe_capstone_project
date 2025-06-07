export interface Category {
  id: number;
  name: string;
  image_url: string;
}

export interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface WorkoutExercise {
  name: string;
  description: string;
  image_url: string;
  muscle_group: string;
  sets: number;
  reps: number;
  rest_interval_seconds: number;
  notes: string | null;
}
