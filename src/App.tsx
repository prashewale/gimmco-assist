import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "./guards/auth-guard";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found";
import store from "./providers/store";
import { Toaster } from "./components/ui/sonner";
import AuthProvider from "react-auth-kit";

function App() {
  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<AuthGuard />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
