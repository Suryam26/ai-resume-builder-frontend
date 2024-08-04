import GlobalApi from '@/service/GlobalApi.js';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ResumeContext = createContext({});

export const ResumeContextProvider = ({ children }) => {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState({});

    useEffect(() => {
        GlobalApi.GetResumeById(resumeId)
            .then((res) => setResumeInfo(res.data.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);
