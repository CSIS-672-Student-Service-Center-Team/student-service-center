import {cn} from "@/lib/utils";


const ButtonWrapper = ({children, onClick}: { children: React.ReactNode, onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full h-40 bg-white border-2 border-[#8B1A1A] rounded-2xl",
                "shadow-lg hover:shadow-xl transition-shadow",
                "flex flex-col items-center justify-center gap-2",
                "p-4"
            )}
        >
            {children}
        </button>
    )
}
export default ButtonWrapper;
