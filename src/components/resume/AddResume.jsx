import { Button } from '@/components/ui/button.jsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog.jsx';
import { Input } from '@/components/ui/input.jsx';
import GlobalApi from '@/service/GlobalApi.js';
import { useUser } from '@clerk/clerk-react';
import { Loader2, PlusSquare } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function AddResume() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const onCreate = () => {
        setLoading(true);
        const data = {
            data: {
                resumeId: uuidv4(),
                title: resumeTitle,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
            },
        };
        GlobalApi.CreateResume(data).then(
            (res) => {
                if (res) {
                    setLoading(false);
                    navigate(
                        '/dashboard/resume/' +
                            res.data.data.documentId +
                            '/edit'
                    );
                }
            },
            (err) => {
                console.log(err);
                setLoading(false);
            }
        );
    };

    return (
        <div>
            <div
                className="flex h-[280px] cursor-pointer items-center justify-center rounded-lg border border-dashed bg-secondary p-14 py-24 transition-all hover:scale-105 hover:shadow-md"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            Add a title for your resume
                            <Input
                                className="my-2"
                                placeholder="Enter title"
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className="flex justify-end gap-5">
                            <Button
                                variant="ghost"
                                onClick={() => setOpenDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={onCreate}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    'Create'
                                )}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddResume;
