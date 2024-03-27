"use client";
import actionPath from "@/action";
import { useFetch } from "@/hock/useFetch";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
interface paramsProps {
  params: {
    id: string;
  };
}
export interface food {
  id?: string;
  price?: number;
  title?: string;
  url_imagen?: string;
}
const FormAdmin = ({ params }: paramsProps) => {
  const { getDataForid, upDateID } = useFetch();
  const [food, setFood] = useState<food>();
  const router = useRouter()
  useEffect(() => {
    const verificar =()=>{
      const user = localStorage.getItem("user")
      if (user !== "abaduna") {
       router.push("/login");
      }
      const pasword = localStorage.getItem("password")
      if (pasword !=="1234") {
       router.push("/login");
      }
     }
     verificar()
    const fetchFoodData = async () => {
      const response = await getDataForid(params.id);
      if (response) {
        setFood(response.data[0]);
        console.log(response.data);
        console.log(food);
      }
    };

    fetchFoodData();
  }, []);
  const updateform = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      upDateID(params.id, food as food);
      actionPath;
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  const updateTitle = (newTitle: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      title: newTitle,
    }));
  };
  const updatePrice = (newPrice: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      price: +newPrice,
    }));
  };
  return (
    <div>
      <form onSubmit={updateform}>
        {food && (
          <input
            value={food.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
        )}
        {food && (
          <input
            type="number"
            value={food.price}
            onChange={(e) => updatePrice(e.target.value)}
          />
        )}
        {food && <img src={food.url_imagen} alt={food.title} />}
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default FormAdmin;
