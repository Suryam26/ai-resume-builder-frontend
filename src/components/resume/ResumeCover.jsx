import { FileText } from 'lucide-react';

function ResumeCover({ resume }) {
    return (
        <div
            id="print"
            className="h-full w-full border-t-[20px] to-blue-500 p-4 shadow-lg"
            style={{ borderColor: resume?.themeColor }}
        >
            <h2
                className="text-center text-xl font-bold"
                style={{ color: resume?.themeColor }}
            >
                {resume?.firstName} {resume?.lastName}
            </h2>
            <h2 className="text-center text-sm font-medium">
                {resume?.jobTitle}
            </h2>
            <FileText
                className="mx-auto my-10"
                style={{ color: resume?.themeColor }}
            />
        </div>
    );
}

export default ResumeCover;
