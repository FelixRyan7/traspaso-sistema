
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import PrivateHeader from '../components/headers/PrivateHeader'
import { useState } from 'react';
import MobileSidebar from '../components/sidebar/MobileSidebar';
// LAyout utilizado solo cuando el usuario este logeado
export default function PrivateLayout() {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white/80">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* mobile sidebar */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden pb-12">

        <PrivateHeader setMobileOpen={setMobileOpen} />
        
        <div className='flex-1 overflow-y-auto p-2 mx-1 md:mx-6'>
          <Outlet />
        </div>
        
      </main>

    </div>
  )
}

