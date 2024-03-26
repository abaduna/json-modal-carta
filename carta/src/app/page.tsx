
import ComponetFood from "../componets/ComponetFood";
export interface Menu {
  title: string;
  price: number;
  url_imagen: string;
  id?:string
}
async function getUser(): Promise<Menu[]> {
  //cuadado que queda cacheada
  let response = await fetch("http://localhost:3001/Api/menu", {
    method: "GET",
  });

  let data: Menu[] = await response.json();
  console.log(data);
  return data;
}

export default async function Home() {
  const data = await getUser();

  return (
    <div>
      <img src="/sanmartin.png" />
      {data?.map((food, index) => (
        <ComponetFood key={index} {...food}></ComponetFood>
      ))}
    </div>
  );
}
