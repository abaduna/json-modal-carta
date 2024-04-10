"use client";
import dynamic from "next/dynamic";
import { Menu } from "../app/page";
import syledCompone from "./../app/pageComponet.module.css";
import "react-loading-skeleton/dist/skeleton.css";
const ModalHome = dynamic(() => import("./modalHome.module"))

export interface extraCarrito {
  title:string
  price:number
}
const ComponetFood = ({
  title,
  price,
  url_imagen,
  category,
  setCarrito = ()=>{},
  removeProduct =()=>{},
  itemid

}: Menu) => {
  const product = {
    title,
    price,

  };
  console.log(url_imagen)
  return (
   
   
    <>
      <div className={syledCompone.fooditem}>
        <div className={syledCompone.wrapper}>
          <p className={syledCompone.title}> {title}</p>
          <p>
            <span className={syledCompone.price}>{price}$</span> <br />
            categoria <b>{category}</b>
          </p>
          <img src={url_imagen} alt={title} />
        </div>
        <ModalHome title={title} price={price} itemid={itemid} setCarrito={setCarrito}/>
        <button onClick={()=>removeProduct(product)} className={syledCompone.removeButton}>Quitar</button>
      </div>
    </>
  );
};

export default ComponetFood;
