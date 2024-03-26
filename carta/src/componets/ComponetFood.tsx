import { Menu } from "../app/page";

const ComponetFood = ({ title, price, url_imagen }: Menu) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{price}</p>
      <img src={url_imagen} />
    </>
  );
};

export default ComponetFood;
