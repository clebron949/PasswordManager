import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./routes/Home.tsx";
import About from "./routes/About.tsx";
import Password from "./routes/Password.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/:id" element={<Password />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
