import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, query, where, collection, getDocs } from "firebase/firestore";

const AdminApplyListDetail = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const { basvuruNo } = useParams();
  const [allResults, setAllResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (basvuruNo) {
      const db = getFirestore();
      const formsRef = collection(db, 'formList');
      const q = query(formsRef, where('queryCode', '==', basvuruNo));

      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setSelectedForm(doc.data());
              setAllResults(doc.data().results || []);
              setIsLoading(false);
            });
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [basvuruNo]);
  
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg mt-6 ">
    {isLoading ? (
      <h1 className="text-center font-semibold text-green-400 text-3xl">Loading...</h1>
    ) : (
      <>
        {selectedForm ? (
          <>
            <p className="my-6 text-3xl">
              Hello <span className="font-semibold text-slate-800 ">{selectedForm.name} {selectedForm.surname}!</span>
            </p>
            <p className="my-6">
              Thank you very much for your application! The information you provided is valuable and important. We appreciate your interest and patience!
            </p>

            <h1 className="mb-2 text-red-400 font-semibold text-xl">Here is your application result</h1>

            <div>
              {allResults.length > 0 ? (
                allResults.map((result, index) => (
                  <div key={index} className="bg-gray-100 rounded-md p-3 mb-3">
                    <p>{result}</p>
                  </div>
                ))
              ) : (
                <div className="bg-blue-200 rounded-md p-3 mb-3">
                  <p>Your application has not been returned yet!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>No data found</p>
        )}
      </>
    )}
  </div>
);
};

export default AdminApplyListDetail;
