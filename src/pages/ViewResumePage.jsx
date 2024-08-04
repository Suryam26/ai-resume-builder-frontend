import ResumePreview from '@/components/ResumePreview.jsx';
import { ResumeContextProvider } from '@/context/ResumeContext.jsx';

function ViewResumePage() {
    return (
        <ResumeContextProvider>
            <div className="not-print m-10 md:mx-20 lg:mx-36">
                <h1 className="text-center text-2xl font-medium">
                    Your resume is ready,{' '}
                    <span
                        className="cursor-pointer italic text-primary underline"
                        onClick={() => window.print()}
                    >
                        download
                    </span>{' '}
                    it now.
                </h1>
            </div>
            <div id="print-area" className="m-10 md:mx-20 lg:mx-36">
                <ResumePreview />
            </div>
        </ResumeContextProvider>
    );
}

export default ViewResumePage;
