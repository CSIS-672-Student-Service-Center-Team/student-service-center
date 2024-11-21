// components/ui/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
    progress: number; // Expect a value between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="w-full h-2 bg-gray-300 rounded-md overflow-hidden">
            <div
                style={{ width: `${progress}%` }}
                className="h-full bg-[#841414] transition-all duration-300"
            />
        </div>
    );
};

export default ProgressBar;
