import { useEffect} from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <div className="App"> 
    <Outlet />
  </div>
}

export default App;
