import { API } from "@/API";
import { food } from "@/app/admin/formulario/[id]/page";
import { bodyProps } from "@/app/admin/page";
import { Menu } from "@/app/page";
export const useFetch = () => {
  const fetchPost = async (datos: bodyProps) => {
    try {
      const formData = new FormData();

      formData.append("title", datos.title);
      formData.append("price", datos.price);
      formData.append("imageUpLoading", datos.imageUpLoading);
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
      console.log(`algo salio en mal  getData`, error);
    }
  };
  const getDataForid = async (id:string)=>{
    try {
     const data =await API.get(`api/menu/${id}`);
     return data 
    } catch (error) {k
      console.log(`algo salio en en  getDataForid`, error);
    }
  }///menu/:id
  const upDateID = async (id:string,food:food)=>{
    try {
     const data =await API.put(`api/menu/${id}`,food);
     return data 
    } catch (error) {
      console.log(`algo salio en en  getDataForid`, error);
    }
  }
  return { fetchPost, deletID, getData,getDataForid ,upDateID};
};
