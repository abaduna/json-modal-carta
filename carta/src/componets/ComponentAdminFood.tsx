"use client"
import { Menu } from "@/app/page";
import { useFetch } from "@/hock/useFetch";
import React from "react"
function ComponentAdminFood({ title, price, url_imagen, id }: Menu) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { deletID } = useFetch();
  const handleDeleteClick = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault()
    deletID(id)
  };
  return (
    <>
    <form onSubmit={(e)=>handleDeleteClick(e,id as string)}>
      <h1>{title}</h1>
      <p>{price}</p>
      <img src={url_imagen} />
      <button type="submit">Eliminar</button>
    </form>
      
    </>
  );
}

export default ComponentAdminFood;
