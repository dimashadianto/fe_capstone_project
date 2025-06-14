import { getCategories } from "@/services/workout_service";
import { useEffect, useState } from "react";
import { Category } from "@/models/workout_model";
import WorkoutCard from "@/components/workout/WorkoutCard";
import { useNavigate } from "react-router-dom";

export default function WorkoutCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-white to-blue-200">
      <main className="text-center mt-12">
        <h2 className="text-3xl font-bold mb-8">Choose your Workout Plan</h2>
        <div className="flex justify-center gap-12 px-4 flex-wrap">
          {categories.map((category) => (
            <WorkoutCard
              key={category.id}
              text={category.name}
              imageUrl={category.image_url}
              handleClick={() =>
                navigate(`/workout-plans/${category.id}`, {
                  state: category.name,
                })
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}
