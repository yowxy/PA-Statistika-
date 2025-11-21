// src/App.tsx
import { useRoutes } from "react-router-dom";
import AppRoutes from "./routes/routes";
// import './output.css'
import './input.css'  

const App: React.FC = () => {
  const routing = useRoutes(AppRoutes);
  return <>{routing}</>;
};

export default App;
