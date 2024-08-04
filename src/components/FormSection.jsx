import Education from '@/components/forms/Education.jsx';
import Experience from '@/components/forms/Experience.jsx';
import PersonalDetail from '@/components/forms/PersonalDetail.jsx';
import Skills from '@/components/forms/Skills.jsx';
import Summary from '@/components/forms/Summary.jsx';
import ThemeColor from '@/components/forms/ThemeColor.jsx';
import { Button } from '@/components/ui/button.jsx';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

function FormSection() {
    const { resumeId } = useParams();
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(true);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <Link to="/dashboard">
                        <Button size="sm">
                            <Home />
                        </Button>
                    </Link>
                    <ThemeColor />
                </div>
                <div className="flex gap-2">
                    {activeFormIndex > 1 && (
                        <Button
                            size="sm"
                            onClick={() =>
                                setActiveFormIndex(activeFormIndex - 1)
                            }
                        >
                            <ArrowLeft />
                        </Button>
                    )}
                    <Button
                        className="gap2 flex"
                        size="sm"
                        disabled={!enableNext}
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                    >
                        Next <ArrowRight />
                    </Button>
                </div>
            </div>

            {activeFormIndex === 1 && (
                <PersonalDetail enableNext={(value) => setEnableNext(value)} />
            )}
            {activeFormIndex === 2 && (
                <Summary enableNext={(value) => setEnableNext(value)} />
            )}
            {activeFormIndex === 3 && (
                <Experience enableNext={(value) => setEnableNext(value)} />
            )}
            {activeFormIndex === 4 && (
                <Education enableNext={(value) => setEnableNext(value)} />
            )}
            {activeFormIndex === 5 && (
                <Skills enableNext={(value) => setEnableNext(value)} />
            )}
            {activeFormIndex === 6 && (
                <Navigate to={`/my-resume/${resumeId}/view`} />
            )}
        </div>
    );
}

export default FormSection;
