import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import RoutesList from "../constants/RoutesList";
import Home from "../pages/Home/Home";

import ProductsList from "../pages/Products/ProductsList";
import ProductsForm from "../pages/Products/ProductsForm";

import CustomersList from "../pages/Customers/CustomersList";
import CustomersForm from "../pages/Customers/CustomersForm";

import InventoryList from "../pages/Inventory/InventoryList";
import InventoryForm from "../pages/Inventory/InventoryForm";

import OrdersList from "../pages/Orders/OrdersList";
import OrdersForm from "../pages/Orders/OrdersForm";
import OrdersDetails from "../pages/Orders/OrderDetails";

// import DesignsList from "../pages/Designs/DesignsList";
// import DesignForm from "../pages/Designs/DesignsForm";
// import ColorsList from "../pages/Colors/ColorsList";
// import ColorForm from "../pages/Colors/ColorForm";
// import SizesList from "../pages/Sizes/SizesList";
// import SizeForm from "../pages/Sizes/SizeForm";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();

  if (!localStorage.getItem("Token")) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Outlet />}>
          <Route index path={RoutesList.home} element={<Home />} />

          <Route path={RoutesList.products} element={<ProductsList />} />

          <Route path="/products/new" element={<ProductsForm />} />
          <Route path="/products/:id/edit" element={<ProductsForm />} />

          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/new" element={<CustomersForm />} />
          <Route path="/customers/:id/edit" element={<CustomersForm />} />

          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/new" element={<InventoryForm />} />
          <Route path="/inventory/:id/edit" element={<InventoryForm />} />

          <Route path="/orders" element={<OrdersList />} />
          <Route path="/orders/new" element={<OrdersForm />} />
          <Route path="/orders/:id/edit" element={<OrdersForm />} />

          <Route
            path={`${RoutesList.orders}/:id`}
            element={<OrdersDetails />}
          />

          {/* <Route path="/designs" element={<DesignsList />} />
          <Route path="/designs/new" element={<DesignForm />} />
          <Route path="/designs/:id/edit" element={<DesignForm />} />

          <Route path="/colors" element={<ColorsList />} />
          <Route path="/colors/new" element={<ColorForm />} />
          <Route path="/colors/:id/edit" element={<ColorForm />} />

          <Route path="/sizes" element={<SizesList />} />
          <Route path="/sizes/new" element={<SizeForm />} />
          <Route path="/sizes/:id/edit" element={<SizeForm />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
