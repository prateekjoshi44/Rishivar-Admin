import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./assets/scss/bootstrap.scss";
import "./assets/css/responsive.css";
import "./assets/css/global.css";
import "./assets/css/fonts.css";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Astros from "./pages/astro/Astros";
import Astro from "./pages/astro/Astro";
import Calls from "./pages/call/Calls";
import Call from "./pages/call/Call";
import Chat from "./pages/chat/Chat";
import Chats from "./pages/chat/Chats";
import Payment from "./pages/payment/Payment";
import Payments from "./pages/payment/Payments";
import User from "./pages/user/User";
import Users from "./pages/user/Users";
import Order from "./pages/order/Order";
import Orders from "./pages/order/Orders";
import SignIn from "./pages/SignIn"
import { useSelector } from "react-redux";
import Posts from "./pages/post/Posts";
import Post from "./pages/post/Post";
import RedirectToRoot from "./pages/RedirectToRoot";
import CreateAstro from "./pages/astro/CreateAstro";

function App() {

  const isSignedIn = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    import("bootstrap");
  }, []);

  return (

    <Routes>
      {isSignedIn ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="Astro" >
            <Route index element={<Astros />} />
            <Route path=":id" element={<Astro />} />
            <Route path="create" element={<CreateAstro />} />
          </Route>

          <Route path="Call" >
            <Route index element={<Calls />} />
            <Route path=":id" element={<Call />} />
          </Route>

          <Route path="Chat" >
            <Route index element={<Chats />} />
            <Route path=":id" element={<Chat />} />
          </Route>

          <Route path="Payment" >
            <Route index element={<Payments />} />
            <Route path=":id" element={<Payment />} />
          </Route>

          <Route path="User" >
            <Route index element={<Users />} />
            <Route path=":id" element={<User />} />
          </Route>


          <Route path="Order" >
            <Route index element={<Orders />} />
            <Route path=":id" element={<Order />} />
          </Route>

          <Route path="Post" >
            <Route index element={<Posts />} />
            <Route path=":id" element={<Post />} />

          </Route>


          <Route path="*" element={<RedirectToRoot />} />
        </Route>
      ) : (
        <Route path="/">
          <Route index element={<SignIn />} />
          <Route path="*" element={<RedirectToRoot />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
