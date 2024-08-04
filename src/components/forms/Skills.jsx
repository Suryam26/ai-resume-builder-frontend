import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { skillsFormFields } from '@/constants/index.js';
import { useResume } from '@/context/ResumeContext.jsx';
import GlobalApi from '@/service/GlobalApi.js';
import { Rating } from '@smastrom/react-rating';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Skills({ enableNext }) {
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useResume();
    const [skillList, setSkillList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const addMoreSkills = () =>
        setSkillList([...skillList, { ...skillsFormFields }]);
    const removeSkills = () => setSkillList(skillList.slice(0, -1));

    const handleChange = (index, name, value) => {
        const newSkillList = [...skillList];
        newSkillList[index][name] = value;
        setSkillList(newSkillList);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        GlobalApi.UpdateResume(resumeId, {
            data: { skills: skillList },
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
        if (resumeInfo?.skills.length === 0) {
            setSkillList([{ ...skillsFormFields }]);
        } else {
            setSkillList(resumeInfo?.skills);
        }
    }, []);

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, skills: skillList });
    }, [skillList]);

    return (
        <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
            <div className="text-lg font-bold">Skills</div>
            <p>Add your top skills</p>

            <div>
                {skillList.map((skill, index) => (
                    <div
                        key={index}
                        className="my-5 flex justify-between rounded-lg border p-3"
                    >
                        <div>
                            <label className="text-sm">Name</label>
                            <Input
                                name="name"
                                className="w-full"
                                defaultValue={skill.name}
                                onChange={(e) =>
                                    handleChange(index, 'name', e.target.value)
                                }
                            />
                        </div>
                        <Rating
                            style={{ maxWidth: 120 }}
                            value={skill.rating}
                            onChange={(value) =>
                                handleChange(index, 'rating', value)
                            }
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={addMoreSkills}
                    >
                        + Add More Education
                    </Button>
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={removeSkills}
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

export default Skills;
