"use client";
import actionPath from "@/action";
import { bodyProps } from "@/app/admin/page";
import { useFetch } from "@/hock/useFetch";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

interface FormProps {
  updata: boolean;
  setUpdate: Function;
}

function FormularioAdmin({ setUpdate, updata }: FormProps) {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>(""); //imageUpLoading
  const [imageUpLoading, setImageUpLoading] = useState<File | string>("");
  const { fetchPost } = useFetch();
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: bodyProps = {
      title,
      price,
      imageUpLoading,
    };
    fetchPost(data);
    actionPath();
    setUpdate(!updata);
    
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUpLoading(e.target.files[0]);
    } else {
      console.log(`es nulo`);
    }
  };
  return (
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
  );
}

export default FormularioAdmin;
