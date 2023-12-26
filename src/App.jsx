import Header from "./components/Header/Header"
import './App.css';
import Router from "./components/Router/Router";
import FormDataProvider from "./context/FormDataProvider";
function App() {


  return (
    <>
    <FormDataProvider>
    <Header/>
    <Router/>
    </FormDataProvider>

    </>
  )
}

export default App
