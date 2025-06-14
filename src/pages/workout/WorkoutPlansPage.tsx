import WorkoutCard from "@/components/workout/WorkoutCard";
import { WorkoutPlan } from "@/models/workout_model";
import { getWorkoutPlans } from "@/services/workout_service";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function WorkoutPlansPage() {
  const { id } = useParams<{ id: string }>();
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();
  const categoryName = location.state;

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const fetchPlans = async () => {
      try {
        const response = await getWorkoutPlans(id);
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-white to-blue-200">
      <main className="text-center mt-12">
        <h2 className="text-3xl font-bold mb-8">
          {categoryName} Workout Plans
        </h2>
        <div className="flex justify-center gap-12 px-4 flex-wrap">
          {plans.map((plan) => (
            <WorkoutCard
              key={plan.id}
              text={plan.name}
              imageUrl={plan.image_url}
              handleClick={() =>
                navigate(`/workout-exercises/${plan.id}`, { state: plan })
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}
