import { toast } from "sonner";

const toaster = (type: string, message: string, desc: string = '') => {
    switch (type) {
        case "success":
            toast.success(message);
            break;

        case "info":
            toast(message, { position: "bottom-right" });
            break;

        case "error":
            toast.error(message);
            break;

        case "loading":
            toast.loading(message, { position: "bottom-right", icon: "⏳" });
            break;

        default:
            toast(message, { position: "bottom-right" });
            break;
    }

};

export default toaster;
