import { API } from "@/API";
import { bodyProps } from "@/app/admin/page";
import { Menu } from "@/app/page";
export const useFetch = () => {
  const fetchPost = async (datos: bodyProps) => {
    console.log(`fetchPost`);
    try {
      const formData = new FormData();

      formData.append("title", datos.title);
      formData.append("price", datos.title);
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

  return { fetchPost };
};
