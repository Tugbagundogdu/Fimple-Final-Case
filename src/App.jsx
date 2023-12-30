import Header from "./components/Header/Header"
import './App.css';
import Router from "./components/Router/Router";
import FormDataProvider from "./context/FormDataProvider";
import ApplicationResultProvider from "./context/ApplicationResult";
import GenerateUniqueCodeProvider from "./context/GenerateUniqueCode";
import AuthContextProvider from "./context/Auth";
function App() {


  return (
    <>
    <AuthContextProvider>
    <GenerateUniqueCodeProvider>
    <ApplicationResultProvider>
    <FormDataProvider>
    <Header/>
    <Router/>
    </FormDataProvider>
    </ApplicationResultProvider>
    </GenerateUniqueCodeProvider>
    </AuthContextProvider>
    </>
  )
}

export default App
