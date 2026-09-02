import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ContactUsLottie = ({ className }) => {
    return (
        <div className={`${className}`}>
            <DotLottieReact
                src="/lottie/contact-us.lottie"
                loop
                autoplay
                // className="w-full h-full"
            />
        </div>
    );
};

export default ContactUsLottie;
