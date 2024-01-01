
import {  Routes, Route } from 'react-router-dom';
import ApplicationForm from "../ApplicationForm/ApplicationForm";
import AdminPanel from "../AdminPanel/AdminPanel";
import Homepage from '../Homepage/Homepage';
import ApplicationSuccess from '../ApplicationSuccess/ApplicationSuccess';
import ApplicationInquiry from '../ApplicationInquiry/ApplicationInquiry';
import ApplicationDetail from '../ApplicationDetail/ApplicationDetail';
import AdminApplyListDetail from '../AdminApplyListDetail/AdminApplyListDetail';
import AdminApplyList from '../AdminApplyList/AdminApplyList';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { useAuthContext } from '../../context/Auth';
import NotFound from '../NotFound/NotFound';

const Router = () => {
  const {isLogin} = useAuthContext();
  return (
    <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/basvuru-olustur" element={<ApplicationForm/>} />
        <Route path="/basvuru-basarili" element={<ApplicationSuccess/>}/>
        <Route path="/basvuru-sorgula" element={<ApplicationInquiry/>}/>
        <Route path="/basvuru/:basvuruNo" element={<ApplicationDetail/>}/>
        <Route path="/admin" element={<AdminPanel/>} />
        <Route path="/admin/basvuru-listesi" element={<PrivateRoute Component={AdminApplyList} isAuthenticated={isLogin} />} ></Route>
        <Route path="/admin/basvuru/:basvuruNo" element={<PrivateRoute Component={AdminApplyListDetail} isAuthenticated={isLogin} />}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default Router;
