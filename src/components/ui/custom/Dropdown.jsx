import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.jsx';
import { Download, MoreVertical, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

function Dropdown({ resumeId, setIsOpen }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link to={'/my-resume/' + resumeId + '/view'}>
                    <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Dropdown;
