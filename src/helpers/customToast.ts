import { toast } from "react-toastify";

interface CustomToastProps {
    message: string;
}

class customToast {
    static success({ message}: CustomToastProps) {
        toast.success(message)
    }

    static error({ message}: CustomToastProps) {
        toast.error(message)
    }

    static warning({ message}: CustomToastProps) {
        toast.warning(message)
    }

    static info({ message}: CustomToastProps) {
        toast.info(message)
    }
}

export default customToast;