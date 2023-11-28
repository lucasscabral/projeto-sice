import { useState } from "react";
import IndexHeader from "./components/header/indexHeader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexStock from "./components/stock/indexStock";
import Notiflix from "notiflix";
import IndexBox from "./components/box/indexBox";
import IndexSingIn from "./components/auth/singin/indexSingIn";
import IndexAuth from "./components/auth/indexAuth";
import IndexSingnUp from "./components/auth/singup/indexSingUp";
import IndexHome from "./components/home/indexHome";
import useContext from "./context/useContext";
import IndexSuppliers from "./components/suppliers/indexSuppliers";
import ScreenListSuppliers from "./components/suppliers/screens/screenListSuppliers";
import ScreenShoppingList from "./components/suppliers/screens/screenShoppingList";
import ScreenRegisterPurchases from "./components/suppliers/screens/screenRegisterPurchases";

function App() {
  const [payload, setPayload] = useState();

  return (
    <useContext.Provider value={{ payload, setPayload }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <IndexAuth>
                {" "}
                <IndexSingIn />
              </IndexAuth>
            }
          />
          <Route
            path="/singnUp"
            element={
              <IndexAuth>
                <IndexSingnUp />
              </IndexAuth>
            }
          />

          <Route path="/sice" element={<IndexHeader />}>
            <Route
              path="home"
              element={
                <IndexHome />
              }
            />
            <Route
              path="caixa"
              element={
                <IndexBox />
              }
            />
            <Route
              path="estoque"
              element={
                <IndexStock />
              }
            />
            <Route
              path="fornecedores"
              element={
                <IndexSuppliers />
              }
            />
            <Route
              path="fornecedores/lista"
              element={
                <ScreenListSuppliers />
              }
            />
            <Route
              path="fornecedores/lista-compras"
              element={
                <ScreenShoppingList />
              }
            />
            <Route
              path="fornecedores/registra-compras"
              element={
                <ScreenRegisterPurchases />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </useContext.Provider>
  );
}

Notiflix.Notify.init({
  width: "280px",
  position: "right-bottom",
  distance: "10px",
  opacity: 1,
  borderRadius: "5px",
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: "rgba(0,0,0,0.5)",
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,
  ID: "NotiflixNotify",
  className: "notiflix-notify",
  zindex: 4001,
  fontFamily: "Quicksand",
  fontSize: "13px",
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: "fade",
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: "basic",
  fontAwesomeIconSize: "34px",
  success: {
    background: "#32c682",
    textColor: "#fff",
    childClassName: "notiflix-notify-success",
    notiflixIconColor: "rgba(0,0,0,0.2)",
    fontAwesomeClassName: "fas fa-check-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(50,198,130,0.2)",
  },
  failure: {
    background: "#ff5549",
    textColor: "#fff",
    childClassName: "notiflix-notify-failure",
    notiflixIconColor: "rgba(0,0,0,0.2)",
    fontAwesomeClassName: "fas fa-times-circle",
    fontAwesomeIconColor: "rgba(0,0,0,0.2)",
    backOverlayColor: "rgba(255,85,73,0.2)",
  },
});

export default App;
