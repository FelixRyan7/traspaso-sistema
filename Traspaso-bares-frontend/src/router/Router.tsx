import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { AuthRoute } from "./AuthRoute";
import PrivateLayout from "../layouts/PrivateLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import Location from "../pages/Location";
import Products from "../pages/Products";
import ForbiddenPage from "../pages/ForbiddenPage";
import RoleGuard from "../components/auth/RoleGuard";
import Pos from "../pages/Pos";
import Workspace from "../pages/Workspace";
import LocationListPage from "../pages/LocationListPage";
import LocationRequestsPage from "../pages/LocationRequestsPage";
import LocationDeliverPage from "../pages/LocationDeliverPage";
import LocationDailyDeliveries from "../pages/LocationTodayDeliveriesPage";
import TransfersPage from "../pages/TransfersPage";
import LocationScheduledDeliveryPage from "../pages/LocationScheduledDeliveryPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
         {/* Layout Logeado */}
        <Route element={<ProtectedRoute />}>
          <Route path="/workspace" element={<PrivateLayout />}>
            <Route index element={<Workspace />} />
            <Route path="locations/:locationId" element={<Location />} />
            <Route path="locations/:locationId/list" element={<LocationListPage />} />
            <Route path="locations/:locationId/requests" element={<LocationRequestsPage />} />
            <Route path="locations/:locationId/add-product" element={<LocationDeliverPage />} />
            <Route path="locations/:locationId/today-deliveries" element={<LocationDailyDeliveries />} />
            <Route path="admin/productos" element={
              <RoleGuard allowedRoles={["admin","manager"]}>
                <Products />
              </RoleGuard>
             } />
            <Route
              path="transfers"
              element={
                <RoleGuard allowedRoles={["admin", "manager"]}>
                  <TransfersPage />
                </RoleGuard>
              }
            />
            <Route
              path="scheduled-deliveries"
              element={
                <RoleGuard allowedRoles={["admin", "manager"]}>
                  <LocationScheduledDeliveryPage />
                </RoleGuard>
              }
            />
             <Route path="admin/pos" element={
              <RoleGuard allowedRoles={["admin", "manager"]}>
                <Pos />
              </RoleGuard>
            } />
            </Route>
          
        </Route>

        <Route element={<AuthRoute />}>
            <Route index element={<Login />} />
        </Route>
        
        <Route path="/403" element={<ForbiddenPage />} />
      </Routes>
    </BrowserRouter>
  )
}
