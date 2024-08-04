import AddResume from '@/components/resume/AddResume.jsx';
import ResumeCardItem from '@/components/resume/ResumeCardItem.jsx';
import GlobalApi from '@/service/GlobalApi.js';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

function DashboardPage() {
    const { user } = useUser();
    const [resumeList, setResumeList] = useState([]);

    const removeResume = (id) => {
        setResumeList(resumeList.filter((resume) => resume.documentId !== id));
    };

    useEffect(() => {
        if (!user) return;
        GlobalApi.GetResumes(user?.primaryEmailAddress?.emailAddress).then(
            (res) => setResumeList(res.data.data)
        );
    }, [user]);

    return (
        <div className="p-10 md:px-20 lg:px-32">
            <h2 className="text-3xl font-bold">My Resume</h2>
            <p>Start building your resume today.</p>
            <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
                <AddResume />
                {resumeList.map((resume, index) => (
                    <ResumeCardItem
                        key={index}
                        resume={resume}
                        removeResume={removeResume}
                    />
                ))}
            </div>
        </div>
    );
}

export default DashboardPage;
