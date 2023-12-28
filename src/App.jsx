import Header from "./components/Header/Header"
import './App.css';
import Router from "./components/Router/Router";
import FormDataProvider from "./context/FormDataProvider";
import ApplicationResultProvider from "./context/ApplicationResult";
import GenerateUniqueCodeProvider from "./context/GenerateUniqueCode";
function App() {


  return (
    <>
    <GenerateUniqueCodeProvider>
    <ApplicationResultProvider>
    <FormDataProvider>
    <Header/>
    <Router/>
    </FormDataProvider>
    </ApplicationResultProvider>
    </GenerateUniqueCodeProvider>
    </>
  )
}

export default App
