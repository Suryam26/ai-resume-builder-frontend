import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { summaryPrompt } from '@/constants/index.js';
import { useResume } from '@/context/ResumeContext.jsx';
import { AIChatSession } from '@/service/AIModel.js';
import GlobalApi from '@/service/GlobalApi.js';
import { Brain, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Summary({ enableNext }) {
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useResume();
    const [summary, setSummary] = useState('');
    const [AISummary, setAISummary] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (value) => {
        setSummary(value);
        setResumeInfo({ ...resumeInfo, summary: value });
    };

    const generateSummary = async () => {
        setIsLoading(true);
        if (!resumeInfo?.jobTitle) {
            setIsLoading(false);
            toast.warning('Please add job title');
            return;
        }

        const PROMPT = summaryPrompt.replace(
            '{jobTitle}',
            resumeInfo?.jobTitle
        );
        AIChatSession.sendMessage(PROMPT).then((result) => {
            setAISummary(JSON.parse(result.response.text()));
            setIsLoading(false);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        GlobalApi.UpdateResume(resumeId, { data: { summary } }).then(
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
        resumeInfo.summary && setSummary(resumeInfo.summary);
    }, []);

    return (
        <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
            <div className="text-lg font-bold">Summary</div>
            <p>Add summary for your job title</p>

            <form className="mt-7" onSubmit={handleSubmit}>
                <div className="flex items-end justify-between">
                    <label className="text-sm">Add Summary</label>
                    <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={generateSummary}
                        className="flex gap-2 border-primary text-primary"
                    >
                        <Brain className="h-4 w-4" />
                        Generate from AI
                    </Button>
                </div>
                <Textarea
                    required
                    name="summary"
                    className="mt-5 h-32"
                    defaultValue={summary}
                    onChange={(e) => handleChange(e.target.value)}
                />
                <div className="mt-3 flex justify-end">
                    <Button type="submit" disabled={isLoading || !summary}>
                        {isLoading ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            'Save'
                        )}
                    </Button>
                </div>
            </form>

            {AISummary && (
                <div className="mt-5">
                    <h2 className="text-lg font-bold">Suggestions</h2>
                    {AISummary.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleChange(item?.summary)}
                            className="mt-10 cursor-pointer rounded-lg border-2 border-primary p-5 shadow-lg"
                        >
                            <h2 className="my-1 font-bold">
                                Level: {item?.experience_level}
                            </h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summary;
