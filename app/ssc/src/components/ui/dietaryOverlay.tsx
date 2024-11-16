import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DietaryPreference } from '@/lib/dining-utils'

export interface DietaryOverlayProps {
    preferences: string[];
    dietaryPreferences: DietaryPreference[];
    onClose: () => void;
    onPreferenceChange: (id: string, checked: boolean) => void;
    onSave: () => void;
}

const DietaryOverlay: React.FC<DietaryOverlayProps> = ({
    preferences,
    dietaryPreferences,
    onClose,
    onPreferenceChange,
    onSave,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">Select Dietary Preferences</h2>
                <div className="space-y-4">
                    {dietaryPreferences.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={option.id}
                                checked={preferences.includes(option.id)}
                                onChange={() =>
                                    onPreferenceChange(option.id,
                                        !preferences.includes(option.id)
                                    )}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                        </div>
                    ))}
                </div>
                <Button
                    onClick={onSave}
                    className="w-full mt-6 bg-[#8B1A1A] hover:bg-[#8B1A1A]/90"
                >
                    Save Preferences
                </Button>
            </div>
        </div>
    );
};

export default DietaryOverlay;

