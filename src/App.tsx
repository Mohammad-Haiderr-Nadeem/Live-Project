import React from "react";
import { Suspense } from "react";
import UserApiRoutes from "./Components/UserApiRoutes/UserApiRoutes";
import AdminApiRoutes from "./Components/AdminApiRoutes/AdminApiRoutes";

function App() {
  return (
    <Suspense fallback={"Loading...."}>
      <React.Fragment>
        <UserApiRoutes />
        <AdminApiRoutes />
      </React.Fragment>
    </Suspense>
  );
}

export default App;
