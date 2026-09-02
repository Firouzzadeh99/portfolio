import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const CodingLottie = ({ className }) => {
    return (
        <div className={`${className}`}>
            <DotLottieReact
                src="/lottie/developer-ai.lottie"
                loop
                autoplay
                // className="w-full h-full"
            />
        </div>
    );
};
