"use client"
import { useFetch } from "@/hock/useFetch";
import { ChangeEvent, useState } from "react";

export interface bodyProps {
  title: string
  price:string
  imageUpLoading: string
}
function Admin() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>(""); //imageUpLoading
  const [imageUpLoading, setImageUpLoading] = useState<string>("");
  const { fetchPost } = useFetch();
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("title",title);
    console.log("price",price);
    console.log("imageUpLoading",imageUpLoading);
    const data = {
      title,
      price,
      imageUpLoading,
    };
    fetchPost(data)

  
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  };
  return (
    <>
      <h1>Agregar</h1>
      <form>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name={title}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name={price}
            required
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            name={imageUpLoading}
            value={imageUpLoading}
            onChange={(e) => handleImageChange(e)}
            required
          />
        </div>
        <button onClick={(e: any) => sendData(e)}>Enviar</button>
      </form>
    </>
  );
}

export default Admin;
