import RichTextEditor from '@/components/forms/RichTextEditor.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { experienceFormFields } from '@/constants/index.js';
import { useResume } from '@/context/ResumeContext.jsx';
import GlobalApi from '@/service/GlobalApi.js';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Experience({ enableNext }) {
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useResume();
    const [experienceList, setExperienceList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const addMoreExperience = () =>
        setExperienceList([...experienceList, { ...experienceFormFields }]);

    const removeExperience = () =>
        setExperienceList(experienceList.slice(0, -1));

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newExperienceList = [...experienceList];
        newExperienceList[index][name] = value;
        setExperienceList(newExperienceList);
    };

    const onRichTextChange = (index, value) => {
        const newExperienceList = [...experienceList];
        newExperienceList[index].workSummary = value;
        setExperienceList(newExperienceList);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        GlobalApi.UpdateResume(resumeId, {
            data: { experience: experienceList },
        }).then(
            () => {
                enableNext(true);
                setIsLoading(false);
                toast.success('Resume updated successfully');
            },
            (err) => {
                console.error(err);
                setIsLoading(false);
                toast.error('Something went wrong');
            }
        );
    };

    useEffect(() => {
        if (resumeInfo?.experience.length === 0) {
            setExperienceList([{ ...experienceFormFields }]);
        } else {
            setExperienceList(resumeInfo?.experience);
        }
    }, []);

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, experience: experienceList });
    }, [experienceList]);

    return (
        <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
            <div className="text-lg font-bold">Professional Experience</div>
            <p>Add your professional experience</p>

            <div>
                {experienceList.map((experience, index) => (
                    <div key={index}>
                        <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
                            <div>
                                <label className="text-xs">
                                    Position Title
                                </label>
                                <Input
                                    name="title"
                                    type="text"
                                    defaultValue={experience.title}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Company Name</label>
                                <Input
                                    name="companyName"
                                    type="text"
                                    defaultValue={experience.companyName}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">City</label>
                                <Input
                                    name="city"
                                    type="text"
                                    defaultValue={experience.city}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">State</label>
                                <Input
                                    name="state"
                                    type="text"
                                    defaultValue={experience.state}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Start Date</label>
                                <Input
                                    name="startDate"
                                    type="date"
                                    defaultValue={experience.startDate}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">End Date</label>
                                <Input
                                    name="endDate"
                                    type="date"
                                    defaultValue={experience.endDate}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div className="col-span-2">
                                <RichTextEditor
                                    index={index}
                                    onRichTextChange={(value) =>
                                        onRichTextChange(index, value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={addMoreExperience}
                    >
                        + Add More Experience
                    </Button>
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={removeExperience}
                    >
                        - Remove
                    </Button>
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        'Save'
                    )}
                </Button>
            </div>
        </div>
    );
}

export default Experience;
