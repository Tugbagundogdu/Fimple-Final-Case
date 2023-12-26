import { createContext, useContext, useEffect, useState } from "react";

 const FormDataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFormData = () => {
  return useContext(FormDataContext);
}


// eslint-disable-next-line react/prop-types
const FormDataProvider = ({children}) =>{
  const [formList, setFormList] = useState([]); // Tüm formları saklayacak liste

  useEffect(() => {
    const storedFormDatas = localStorage.getItem('formDatas');
    if (storedFormDatas) {
      setFormList(JSON.parse(storedFormDatas));
    }
  }, []);

  useEffect(() => {
      localStorage.setItem('formDatas', JSON.stringify(formList));
  }, [formList]); // formList'i useEffect içine ekleyerek sonsuz döngüyü önlemek için gerekli

  const updateFormData = (newFormData) => {
    setFormList((prevFormList) => {
      return [...prevFormList, newFormData];
    });
  }

return(
  <FormDataContext.Provider value={{formList, updateFormData}}>
    {children}
  </FormDataContext.Provider>
)
}

export default FormDataProvider;

