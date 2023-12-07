import { useState } from "react";
import Header from "./components/Header/Header";
import Instructions from "./components/Instructions/Instructions";
import { TodoTaskCard } from "./components/TodoTaskCard/TodoTaskCard";
import { ToggleTheme } from "./components/ToggleTheme/ToggleTheme";

function App() {
  const [isDark, setIsDark] = useState(true);

  const handleDarkMode = () => {
    setIsDark(!isDark);
  };
  return (
    <>
      <div data-theme={isDark ? "dark" : "light"}>
        <div className="AppUI">
          <div className="AppUI__container">
            <Header />
            <ToggleTheme isDark={isDark} handleDarkMode={handleDarkMode} />
            <Instructions />
            <TodoTaskCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
