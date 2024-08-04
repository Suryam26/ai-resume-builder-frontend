import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { useResume } from '@/context/ResumeContext.jsx';
import GlobalApi from '@/service/GlobalApi.js';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function PersonalDetail({ enableNext }) {
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useResume();
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setResumeInfo({ ...resumeInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        GlobalApi.UpdateResume(resumeId, { data: formData }).then(
            () => {
                enableNext(true);
                setIsLoading(false);
                toast('Resume updated successfully');
            },
            (err) => {
                console.error(err);
                setIsLoading(false);
                toast('Something went wrong');
            }
        );
    };

    return (
        <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
            <div className="text-lg font-bold">PersonalDetail</div>
            <p>Get started with basic information</p>

            <form onSubmit={handleSubmit}>
                <div className="mt-5 grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-sm">First Name</label>
                        <Input
                            required
                            name="firstName"
                            defaultValue={resumeInfo?.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Last Name</label>
                        <Input
                            required
                            name="lastName"
                            defaultValue={resumeInfo?.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Job Title</label>
                        <Input
                            required
                            name="jobTitle"
                            defaultValue={resumeInfo?.jobTitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Address</label>
                        <Input
                            required
                            name="address"
                            defaultValue={resumeInfo?.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Phone</label>
                        <Input
                            required
                            name="phone"
                            defaultValue={resumeInfo?.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Email</label>
                        <Input
                            required
                            name="email"
                            defaultValue={resumeInfo?.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mt-3 flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            'Save'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;
