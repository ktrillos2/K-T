import { BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import {
  Navbar,
  Preloader,
  Hero, // Keep Hero eager for LCP
  About, // Keep About eager as it's above fold-ish
} from "./components";

// Lazy load heavy components
const Achievement = lazy(() => import("./components/Achievement"));
const SkillKeyboard = lazy(() => import("./components/SkillKeyboard"));
const Works = lazy(() => import("./components/Works"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas").then(module => ({ default: module.StarsCanvas })));

import EasterEggs from "./components/EasterEggs";
import ElasticCursor from "./components/ElasticCursor";

const App = () => {
  return (
    <Preloader>
      <BrowserRouter>
        <div
          className="relative z-0"
          style={{ backgroundColor: "hsl(222.2 84% 4.9%)" }}
        >
          <ElasticCursor />
          <EasterEggs />
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <Suspense fallback={null}>
            <StarsCanvas />
            <About />
            <Achievement />
            <SkillKeyboard />
            <Works />
            <Feedbacks />
            <div className="relative z-0">
              <Contact />
            </div>
          </Suspense>
        </div>
      </BrowserRouter>
    </Preloader>
  );
};

export default App;
