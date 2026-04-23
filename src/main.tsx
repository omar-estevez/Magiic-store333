import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from "./router";
import { BrowserRouter } from 'react-router-dom';

import "@/styles/global.css";
import "@/styles/typography.css";
import "@/styles/animations.css";
import "@/styles/components.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)
