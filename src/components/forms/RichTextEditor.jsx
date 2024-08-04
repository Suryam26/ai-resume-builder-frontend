import { Button } from '@/components/ui/button.jsx';
import { workSummaryPrompt } from '@/constants/index.js';
import { useResume } from '@/context/ResumeContext.jsx';
import { AIChatSession } from '@/service/AIModel.js';
import { Brain, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnUnderline,
    Editor,
    EditorProvider,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg';
import { toast } from 'sonner';

function RichTextEditor({ index, onRichTextChange }) {
    const { resumeInfo } = useResume();
    const [isLoading, setIsLoading] = useState(false);

    const addBulletPoint = (bulletPoints) => {
        let newBulletPoints = '<ul>';
        bulletPoints.forEach((bulletPoint) => {
            newBulletPoints += bulletPoint;
        });
        newBulletPoints += '</ul>';
        onRichTextChange(newBulletPoints);
    };

    const generateSummary = async () => {
        setIsLoading(true);
        if (!resumeInfo?.experience[index]?.title) {
            setIsLoading(false);
            toast.warning('Please add position title');
            return;
        }

        const PROMPT = workSummaryPrompt.replace(
            '{positionTitle}',
            resumeInfo?.experience[index]?.title
        );
        AIChatSession.sendMessage(PROMPT).then((result) => {
            addBulletPoint(JSON.parse(result.response.text()));
            setIsLoading(false);
        });
    };

    return (
        <div>
            <div className="my-2 flex items-end justify-between">
                <label className="text-xs">Work Summary</label>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={isLoading}
                    onClick={generateSummary}
                    className="flex gap-2 text-primary"
                >
                    {isLoading ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                        <Brain className="h-4 w-4" />
                    )}
                    Generate from AI
                </Button>
            </div>
            <EditorProvider>
                <Editor
                    value={resumeInfo?.experience[index]?.workSummary}
                    onChange={(e) => onRichTextChange(e.target.value)}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
