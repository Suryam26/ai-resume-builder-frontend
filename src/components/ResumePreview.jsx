import EducationalPreview from '@/components/preview/EducationalPreview.jsx';
import ExperiencePreview from '@/components/preview/ExperiencePreview.jsx';
import PersonalDetailPreview from '@/components/preview/PersonalDetailPreview.jsx';
import SkillsPreview from '@/components/preview/SkillsPreview.jsx';
import SummaryPreview from '@/components/preview/SummaryPreview.jsx';
import { useResume } from '@/context/ResumeContext.jsx';

function ResumePreview() {
    const { resumeInfo } = useResume();
    return (
        <div
            id="print"
            className="aspect-[1/1.414] h-full max-w-[794px] border-t-[20px] p-14 shadow-lg"
            style={{ borderColor: resumeInfo?.themeColor }}
        >
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            <SummaryPreview resumeInfo={resumeInfo} />
            <ExperiencePreview resumeInfo={resumeInfo} />
            <EducationalPreview resumeInfo={resumeInfo} />
            <SkillsPreview resumeInfo={resumeInfo} />
        </div>
    );
}

export default ResumePreview;
