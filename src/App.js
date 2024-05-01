import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css';

function App() {

  return(
    <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/bad-path' component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </BrowserRouter>
  )
} 

export default App;
