import { Button } from '@/components/ui/button.jsx';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover.jsx';
import { colors } from '@/constants/index.js';
import { useResume } from '@/context/ResumeContext.jsx';
import GlobalApi from '@/service/GlobalApi.js';
import { LayoutGrid } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ThemeColor() {
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useResume();

    const handleColorChange = (color) => {
        setResumeInfo((prev) => ({ ...prev, themeColor: color }));
        GlobalApi.UpdateResume(resumeId, { data: { themeColor: color } }).then(
            () => {
                toast.success('Theme color updated successfully');
            },
            (error) => {
                console.log(error);
                toast.error('Something went wrong');
            }
        );
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="flex gap-2" variant="outline" size="sm">
                    <LayoutGrid /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className="mb-2 text-center text-sm font-bold">
                    Select a theme color
                </h2>
                <div className="grid grid-cols-4 items-center gap-2">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            style={{
                                background: color,
                                borderColor:
                                    resumeInfo.themeColor === color
                                        ? 'black'
                                        : 'transparent',
                            }}
                            className="mx-auto h-5 w-5 cursor-pointer rounded-full border bg-gray-200 hover:border-black"
                            onClick={() => handleColorChange(color)}
                        ></div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;
