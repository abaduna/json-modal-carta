import syledCompone from "@/app/page.module.css"
import Skeleton from 'react-loading-skeleton'
export function SkeletonHome() {
  return (
    <div className={syledCompone.fooditem}>
      
    <div className={syledCompone.wrapper}>
      <p className={syledCompone.title}> <Skeleton />  </p>
      <p>
        <span className={syledCompone.price}><Skeleton /> $</span> <br />
        categoria <b><Skeleton /> </b>
      </p>

    </div>
   </div>
  )
}