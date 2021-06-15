import logo from './logo.svg';
import './App.css';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import User from './pages/User';
import Store from './pages/Store';
import { Route } from 'react-router-dom'
import Feedback from './pages/Feedback';
import Report from './pages/Report';
import Service from './pages/Service';
import Problem from './pages/Problem';
import ReportStore from './pages/ReportStore';


function App() {
  return (
    <div className="App">
      <div className="container-left">
        <Drawer />
      </div>
      <div className="container-right">
        <Route path="/home" component={Home}/>
        <Route path="/user" component={User} />
        <Route path="/store" component={Store} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/report" component={Report} />
        <Route path="/service" component={Service} />
        <Route path="/problem" component={Problem} />
        <Route path="/reportStore" component={ReportStore} />
      </div>      
    </div>
  );
}

export default App;
