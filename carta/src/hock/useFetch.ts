import { API } from "@/API";
import { bodyProps } from "@/app/admin/page";
import { Menu } from "@/app/page";
export const useFetch = () => {
  const fetchPost = async (datos: bodyProps) => {
    console.log(`fetchPost`);
    try {
      const formData = new FormData();

      formData.append("title", datos.title);
      formData.append("price", datos.price);
      formData.append("imageUpLoading", datos.imageUpLoading);
      console.log(formData);
      await API.post("api/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(`algo salio en en  fetchPost`);
      console.error(error);
    }
  };
  const deletID = async (id: string) => {
    try {
      await API.delete(`api/menu/${id}`);
    } catch (error) {
      console.log(`algo salio en en  fetchPost`, error);
    }
  };
  const getData = async () => {
    try {
      const data = await API.get("api/menu");
      return data;
    } catch (error) {
      console.log(`algo salio en en  getData`, error);
    }
  };
  return { fetchPost, deletID, getData };
};
