import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { assetPath } from "@/lib/asset-path";

const ContactUsLottie = ({ className }) => {
    return (
        <div className={`${className}`}>
            <DotLottieReact
                src={assetPath("/lottie/contact-us.lottie")}
                loop
                autoplay
                // className="w-full h-full"
            />
        </div>
    );
};

export default ContactUsLottie;
