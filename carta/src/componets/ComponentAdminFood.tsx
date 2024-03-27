"use client";
import actionPath from "@/action";

import { useFetch } from "@/hock/useFetch";

import Link from "next/link";
import React from "react";
function ComponentAdminFood({
  title,
  price,
  url_imagen,
  id,
  setUpdate,
  updata,
}: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { deletID } = useFetch();
  const handleDeleteClick = (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    console.log(`deletID`);

    deletID(id);
    actionPath();
    setUpdate(!updata);
  };
  return (
    <>
      <form onSubmit={(e) => handleDeleteClick(e, id as string)}>
        <h1>{title}</h1>
        <p>{price}</p>
        <img src={url_imagen} />
        <button type="submit">Eliminar</button>
        <Link href={`/admin/formulario/${id}`}>Actualizar</Link>
      </form>
    </>
  );
}

export default ComponentAdminFood;
