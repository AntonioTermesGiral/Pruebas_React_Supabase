import { useEffect } from 'react';
import './App.css';
import RouterNav from './components/RouterNav';
import ProfileViewmodel from './vm/ProfileViewmodel';

function App() {

  const vm = ProfileViewmodel.getInstance()

  useEffect(() => {
    vm.requestLoggedUser()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
         <RouterNav/>
      </header>
    </div>
  );
}

export default App;
