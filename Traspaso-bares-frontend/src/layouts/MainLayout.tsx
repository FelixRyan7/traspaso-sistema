import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-white">
     

      <main className="pt-28">
        <Outlet /> {/* Aquí se renderizan las páginas hijas */}
      </main> 

      {/* <Footer /> */} 
    </div>
  )
}
