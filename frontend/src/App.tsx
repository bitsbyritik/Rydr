import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { UserSignup } from "./pages/UserSignup";
import { UserSignin } from "./pages/UserSignin";
import { CaptainSignin } from "./pages/CaptainSignin";
import { CaptainSignup } from "./pages/CaptainSignup";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/user-signin" element={<UserSignin />} />
          <Route path="/captain-signin" element={<CaptainSignin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
