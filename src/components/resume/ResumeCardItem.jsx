import DeleteResume from '@/components/resume/DeleteResume.jsx';
import Dropdown from '@/components/ui/custom/Dropdown.jsx';
import ResumeCover from '@/components/resume/ResumeCover.jsx';
import GlobalApi from '@/service/GlobalApi.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

function ResumeCardItem({ resume, removeResume }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = () => {
        setIsLoading(true);
        GlobalApi.DeleteResume(resume?.documentId)
            .then(() => {
                setIsLoading(false);
                setIsOpen(false);
                removeResume(resume?.documentId);
                toast.success('Resume deleted successfully');
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
                toast.error('Something went wrong');
            });
    };

    return (
        <div className="cursor-pointer transition-all hover:scale-105 hover:shadow-md">
            <Link to={'/dashboard/resume/' + resume.documentId + '/edit'}>
                <div
                    className="flex h-[280px] items-center justify-center overflow-hidden rounded-t-lg border"
                    style={{ borderColor: resume.themeColor }}
                >
                    <ResumeCover resume={resume} />
                </div>
            </Link>
            <div
                className="flex justify-between rounded-b-lg px-3 py-1 text-white"
                style={{ backgroundColor: resume.themeColor }}
            >
                <h2 className="my-1 text-center">{resume.title}</h2>
                <Dropdown resumeId={resume.documentId} setIsOpen={setIsOpen} />
            </div>
            <DeleteResume
                resume={resume}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isLoading={isLoading}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default ResumeCardItem;
