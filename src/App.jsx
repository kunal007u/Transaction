import React, { Suspense } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import AppRouting from "./Routes/AppRouting";
import Spinner from "./Layout/Loader/Spinner";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ToastContainer
        limit={3}
        className="toaster"
        closeOnClick
        pauseOnHover
        theme="light"
        newestOnTop
        transition={Bounce}
      />
      <AppRouting />
    </Suspense>
  );
};

export default App;
