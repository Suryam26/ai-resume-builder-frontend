function SkillsPreview({ resumeInfo }) {
    return (
        <div className="my-6">
            <h2
                className="mb-2 text-center text-sm font-bold"
                style={{ color: resumeInfo?.themeColor }}
            >
                Skills
            </h2>
            <hr style={{ color: resumeInfo?.themeColor }} />

            <div className="my-4 grid grid-cols-2 gap-3">
                {resumeInfo?.skills?.map((skill, index) => (
                    <div
                        key={index}
                        className="my-1 flex items-center justify-between"
                    >
                        <h2 className="text-xs">{skill?.name}</h2>
                        <div className="h-2 w-[120px] bg-gray-200">
                            <div
                                className="h-2"
                                style={{
                                    backgroundColor: resumeInfo?.themeColor,
                                    width: skill?.rating * 20 + '%',
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillsPreview;
