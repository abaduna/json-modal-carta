"use client";
import { useFetch } from "@/hock/useFetch";
import { ChangeEvent, useEffect, useState } from "react";
import { Menu } from "../page";
import ComponentAdminFood from "@/componets/ComponentAdminFood";

export interface bodyProps {
  title: string;
  price: string;
  imageUpLoading: File | string;
}
function Admin() {
  const [foods, setFoods] = useState([]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>(""); //imageUpLoading
  const [imageUpLoading, setImageUpLoading] = useState<File | string>("");
  const { fetchPost, getData } = useFetch();
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("title", title);
    console.log("price", price);
    console.log("imageUpLoading", imageUpLoading);
    const data: bodyProps = {
      title,
      price,
      imageUpLoading,
    };
    console.log("Data a enviar:", data);
    fetchPost(data);
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (typeof e.target.files[0] === "undefined") {
        console.log(` es undefinf`);
      } else {
        setImageUpLoading(e.target.files[0]);
      }
    } else {
      console.log(`es nulo`);
    }
  };
  useEffect(() => {
    const fetchFoodsData = async () => {
      const response = await getData();
      if (response) {
        setFoods(response.data); // Assuming response.data is the array of foods
      }
    };

    fetchFoodsData();
  }, []);
  return (
    <>
      <h1>Agregar</h1>
      <form onSubmit={sendData}>
        <div>
          <label>Título:</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            required
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input type="file" onChange={handleImageChange} required />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {foods?.length > 0 &&
        foods?.map((food: Menu) => (
          <ComponentAdminFood key={food.id} {...food} />
        ))}
    </>
  );
}

export default Admin;
