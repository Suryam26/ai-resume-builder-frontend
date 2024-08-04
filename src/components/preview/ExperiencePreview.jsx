import { convertDateString } from '@/utils/index.js';

function ExperiencePreview({ resumeInfo }) {
    return (
        <div className="my-6">
            <h2
                className="mb-2 text-center text-sm font-bold"
                style={{ color: resumeInfo?.themeColor }}
            >
                Professional Experience
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />

            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className="my-5">
                    <div className="flex items-end justify-between">
                        <h2
                            className="text-sm font-bold"
                            style={{ color: resumeInfo?.themeColor }}
                        >
                            {experience?.title}
                        </h2>
                        <span className="text-xs">
                            {experience.startDate &&
                                convertDateString(experience.startDate)}
                            {experience?.currentlyWorking
                                ? ' - Present'
                                : ` - ${experience.endDate && convertDateString(experience.endDate)}`}
                        </span>
                    </div>
                    <h2 className="flex justify-between text-[0.8rem]">
                        {experience?.companyName}
                        <span className="text-[0.7rem]">
                            {experience?.city}
                            {experience?.state && `, ${experience?.state}`}
                        </span>
                    </h2>
                    <div
                        className="rsw-ce text-xs"
                        dangerouslySetInnerHTML={{
                            __html: experience?.workSummary,
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default ExperiencePreview;
