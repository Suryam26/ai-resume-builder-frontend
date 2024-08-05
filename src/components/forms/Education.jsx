import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { educationFormFields } from '@/constants/index.js';
import { useResume } from '@/context/ResumeContext.jsx';
import GlobalApi from '@/service/GlobalApi.js';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Education({ enableNext }) {
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useResume();
    const [educationList, setEducationList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const addMoreEducation = () =>
        setEducationList([...educationList, { ...educationFormFields }]);
    const removeEducation = () => setEducationList(educationList.slice(0, -1));

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEducationList = [...educationList];
        newEducationList[index][name] = value;
        setEducationList(newEducationList);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        GlobalApi.UpdateResume(resumeId, {
            data: { education: educationList },
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
        if (resumeInfo?.education.length === 0) {
            setEducationList([{ ...educationFormFields }]);
        } else {
            setEducationList(resumeInfo?.education.map(({ id, ...fields }) => fields));
        }
    }, []);

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, education: educationList });
    }, [educationList]);

    return (
        <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
            <div className="text-lg font-bold">Education</div>
            <p>Add your educational details</p>

            <div>
                {educationList.map((education, index) => (
                    <data key={index}>
                        <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
                            <div className="col-span-2">
                                <label className="text-xs">
                                    University Name
                                </label>
                                <Input
                                    name="universityName"
                                    defaultValue={education.universityName}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Degree</label>
                                <Input
                                    name="degree"
                                    defaultValue={education.degree}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Major</label>
                                <Input
                                    name="major"
                                    defaultValue={education.major}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Start Date</label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    defaultValue={education.startDate}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">End Date</label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    defaultValue={education.endDate}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs">Description</label>
                                <Textarea
                                    name="description"
                                    defaultValue={education.description}
                                    onChange={() => handleChange(index, event)}
                                />
                            </div>
                        </div>
                    </data>
                ))}
            </div>

            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={addMoreEducation}
                    >
                        + Add More Education
                    </Button>
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={removeEducation}
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

export default Education;
