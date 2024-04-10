import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import { Menu } from "@/app/page";
import { useFetch } from "@/hock/useFetch";
import { extra } from "./FormularioAdmin";

function ModalHome({ title, price, itemid, setCarrito }: Menu) {
  const [modal, setModal] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>("");
  const [extra, setExtra] = useState<extra[]>([]);
  const [select, setSelect] = useState<string>("");
  
  const { getData } = useFetch();

  useEffect(() => {
    const getDataExtra = async () => {
      setEndpoint(`api/extra/${itemid}`);
      const extraData = await getData(endpoint);
      setExtra(extraData?.data);
    };
  }, []);

  const mandardata = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const producto = {
      title,
      select,
    };
    setCarrito && setCarrito((prev: any) => [...prev, producto]);
  };
  
  return (
    <>
      <button className={styles.btnOrder} onClick={() => setModal(!modal)}>Pedir</button>
      {modal && (
        <div className={styles.modal}>
          <form onSubmit={(e) => mandardata(e)}>
          <div>
            <div className={styles.modalcontent}>
              <p>{title}</p>
              <label>Variantes</label>
              <select onChange={(e) => setSelect(e.target.value)}>
                <option value="">Cual preferis?</option>
                {extra &&
                  extra.length > 0 &&
                  extra.map((ext, index) => (
                    <option key={index} value={ext.price}>
                      {ext.title}-{ext.price}$
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button className={styles.addButton} type="submit">Pedir</button>
          <button className={styles.closeBtn} type="button"onClick={()=>setModal(!modal)}>Cerrar</button>
        </form>
        </div>
        
      )}
    </>
  );
}

export default ModalHome;
