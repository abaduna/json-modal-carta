"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import ComponetFood from "../componets/ComponetFood";
import { useFetch } from "@/hock/useFetch";
export interface Menu {
  title: string;
  price: number;
  url_imagen: string;
  id?: string;
  category: string;
}

export default function Home() {
  // const data = await getUser();
  const [serch, setSerch] = useState<string>("");
  const [foods, setFoods] = useState<Menu[]>([]);
  const [endpoint, setEndpoint] = useState<string>("api/menu");
  

  const { getData } = useFetch();
  useEffect(() => {
    const getDataFoods = async () => {
      try {
        const foods = await getData(endpoint);
        if (typeof foods !== "undefined") {
          setFoods(foods.data);
          console.log(foods.data);
        } else {
          console.log(`undefind`);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    getDataFoods();
  }, [endpoint]);
  const handlerCategoryHamburgesa = () => {
    setEndpoint("api/menu?category=hanburgesa");
  };

  const handleSerchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEndpoint(`api/menu/${serch}`);
  };

  return (
    <div>
      <div className={styles.header}>
         <img  className={styles.headerImg} src="/sanmartin.png"  alt="San Martin" />
      </div>
     
      <form  className={styles.formContainer} onSubmit={handleSerchClick}>

          <input
          placeholder="buscar"
          onChange={(e) => setSerch(e.target.value)}
          value={serch}
          className={styles.searchInput}
        />
        <div className={styles.containerBtn}>
          <button  className={styles.searchButton}  type="submit">Buscar</button>
        </div>
        

        
        
      </form>
      <div>
        <button className={styles.categoryButton} onClick={handlerCategoryHamburgesa}>Hamburgesa</button>
      </div>
      
      <div  className={styles.fooditem}>
       {foods.length > 0 &&
        foods?.map((food: Menu) => (
          <ComponetFood key={food.id}  {...food}></ComponetFood>
        ))} 
      </div>
      
    </div>
  );
}
