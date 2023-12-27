import Header from "./components/Header/Header"
import './App.css';
import Router from "./components/Router/Router";
import FormDataProvider from "./context/FormDataProvider";
import ApplicationResultProvider from "./context/ApplicationResult";
function App() {


  return (
    <>
    <ApplicationResultProvider>
    <FormDataProvider>
    <Header/>
    <Router/>
    </FormDataProvider>
    </ApplicationResultProvider>
    </>
  )
}

export default App
