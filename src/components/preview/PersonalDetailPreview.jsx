import { House, Mail, Phone } from 'lucide-react';

function PersonalDetailPreview({ resumeInfo }) {
    return (
        <div>
            <h2
                className="text-center text-xl font-bold"
                style={{ color: resumeInfo?.themeColor }}
            >
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>
            <h2 className="text-center text-sm font-medium">
                {resumeInfo?.jobTitle}
            </h2>
            <a
                className="flex items-center justify-center"
                href={`tel:${resumeInfo?.phone}`}
            >
                <Phone
                    style={{ color: resumeInfo?.themeColor }}
                    className="mr-1 h-3 w-3"
                />
                <h2
                    className="text-center text-xs font-normal"
                    style={{ color: resumeInfo?.themeColor }}
                >
                    {resumeInfo?.phone}
                </h2>
            </a>

            <div className="flex justify-between">
                <a
                    className="flex items-center"
                    href={`mailto:${resumeInfo?.email}`}
                >
                    <Mail
                        style={{ color: resumeInfo?.themeColor }}
                        className="mr-1 h-4 w-4"
                    />
                    <h2
                        className="text-xs font-normal"
                        style={{ color: resumeInfo?.themeColor }}
                    >
                        {resumeInfo?.email}
                    </h2>
                </a>
                <div className="flex items-center">
                    <House
                        style={{ color: resumeInfo?.themeColor }}
                        className="mr-1 h-4 w-4"
                    />
                    <h2
                        className="text-xs font-normal"
                        style={{ color: resumeInfo?.themeColor }}
                    >
                        {resumeInfo?.address}
                    </h2>
                </div>
            </div>
            <hr
                className="my-2 border-[1.5px]"
                style={{ borderColor: resumeInfo?.themeColor }}
            />
        </div>
    );
}

export default PersonalDetailPreview;
