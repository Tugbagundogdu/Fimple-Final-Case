import { collection, getDocs, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

 const FormDataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFormData = () => {
  return useContext(FormDataContext);
}



// eslint-disable-next-line react/prop-types
const FormDataProvider = ({children}) =>{
  const [formList, setFormList] = useState([]); // Tüm formları saklayacak liste


  // sayfa render edldiğinde veritabanında veri varsa
  useEffect(() => {
    fetchDataFromFirestore();
  },[])

  const fetchDataFromFirestore = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "formList"));
    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    } )
    setFormList(data);
  }
  
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

