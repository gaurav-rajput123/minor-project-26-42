import logo from "./logo.svg";
import "./App.css";
import Header from "./header/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/login";
import Main from "./Main";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/authenticate",
    element: <Login />,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
