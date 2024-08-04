import FormSection from '@/components/FormSection.jsx';
import ResumePreview from '@/components/ResumePreview.jsx';
import { ResumeContextProvider } from '@/context/ResumeContext.jsx';

function EditResumePage() {
    return (
        <ResumeContextProvider>
            <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
                <FormSection />
                <ResumePreview />
            </div>
        </ResumeContextProvider>
    );
}

export default EditResumePage;
