import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminApplyListDetail = () => {
  const [resultText, setResultText] = useState("");
  const [selectedForm, setSelectedForm] = useState(null);
  const { basvuruNo } = useParams();

  const [allResults, setAllResults] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedResult, setEditedResult] = useState('');
  const [editedResultIndex, setEditedResultIndex] = useState(null);
  const [createResult, setCreateResult] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const formRef = doc(db, 'formList', basvuruNo);

    getDoc(formRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setSelectedForm(docSnap.data());
          setAllResults(docSnap.data().results || []);
        } else {
          console.log('Belirtilen form bulunamadı.');
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, [basvuruNo]);

  const updateResultsInFirestore = async (newResult) => {
    const db = getFirestore();
    const formRef = doc(db, 'formList', basvuruNo);

    const formDoc = await getDoc(formRef);
    if (formDoc.exists()) {
      const formData = formDoc.data();
      const updatedResults = formData.results ? [...formData.results, newResult] : [newResult];

      await updateDoc(formRef, { results: updatedResults });
      setAllResults(updatedResults);
    } else {
      console.log('Belirtilen form bulunamadı.');
    }
  };

  const updateResults = async (e) => {
    e.preventDefault();
    if (resultText.trim() === '') {
      alert('You cannot send an empty response!');
      return;
    }
    await updateResultsInFirestore(resultText);
    setResultText('');

    toast.success('Response sent successfully!', {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  if (!selectedForm) {
    return <div>Form bulunamadı</div>;
  }

  const handleEditResult = (index) => {
    setEditMode(true);
    setEditedResult(allResults[index]);
    setEditedResultIndex(index);
  };

  const handleUpdateResult = async () => {
    const db = getFirestore();
    const formRef = doc(db, 'formList', basvuruNo);
    const updatedResults = [...allResults];
    updatedResults[editedResultIndex] = editedResult;

    await updateDoc(formRef, { results: updatedResults });
    setAllResults(updatedResults);

    setEditMode(false);

    toast.success('Response updated successfully!', {
      position: toast.POSITION.TOP_LEFT,
    });
    setEditedResultIndex(null);
  };

  return (
<div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg mt-6 ">
  <ToastContainer />
  <h2 className="text-2xl font-bold mb-4">Apply Details</h2>
  <p className="mb-2"><span className="font-semibold">Name:</span> {selectedForm.name}</p>
  <p className="mb-4"><span className="font-semibold">Email:</span> {selectedForm.email}</p>

  <button
    onClick={() => setCreateResult(true)}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none mb-4"
  >
    Answer
  </button>

  <ul>
    {allResults.map((result, index) => (
      <div className="flex items-center justify-between border-b py-2" key={index}>
        <li>{result}</li>
        <button
          onClick={() => handleEditResult(index)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Edit
        </button>
      </div>
    ))}
  </ul>

  {createResult && (
    <form onSubmit={updateResults} className="mt-4">
      <label htmlFor="result" className="block mb-2 font-semibold">Appliy Answer:</label>
      <textarea
        id="result"
        value={resultText}
        onChange={(e) => setResultText(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        rows="6"
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
      >
        Send
      </button>
      <button onClick={() => setCreateResult(false)} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none" >Cancel</button>
    </form>
  )}

  {editMode && (
    <div className="mt-4">
      <textarea
        value={editedResult}
        onChange={(e) => setEditedResult(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        rows="4"
      ></textarea>
      <button
        onClick={handleUpdateResult}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
      >
        Update
      </button>
      <button onClick={() => setEditMode(false)} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none" >Cancel</button>
    </div>
  )}
</div>

);
};
export default AdminApplyListDetail;
