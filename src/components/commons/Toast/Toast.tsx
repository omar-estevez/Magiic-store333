import { FiAlertTriangle, FiCheckCircle, FiInfo, FiLoader, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";

type ToastMessage = string

type PromiseMessages<T = unknown> = {
    loading: string
    success: string | ((data: T) => string)
    error: string | ((error: unknown) => string)
}

const baseStyle = {
    background: "#111827",
    color: "#f9fafb",
}

export const Toast = {
    success(message: ToastMessage) {
        return toast(message, {
            icon: <FiCheckCircle color="#34d399" size={18} />,
            style: {
                ...baseStyle,
                border: "1px solid #10b981",
                color: "#34d399",
            },
        })
    },

    error(message: ToastMessage) {
        return toast(message, {
            icon: <FiXCircle color="#f87171" size={18} />,
            style: {
                ...baseStyle,
                border: "1px solid #ef4444",
                color: "#f87171",
            },
        })
    },

    info(message: ToastMessage) {
        return toast(message, {
            icon: <FiInfo color="#60a5fa" size={18} />,
            style: {
                ...baseStyle,
                border: "1px solid #3b82f6",
                color: "#60a5fa",
            },
        })
    },

    warning(message: ToastMessage) {
        return toast(message, {
            icon: <FiAlertTriangle color="#fbbf24" size={18} />,
            style: {
                ...baseStyle,
                border: "1px solid #f59e0b",
                color: "#fbbf24",
            },
        })
    },

    loading(message: ToastMessage) {
        return toast.loading(message, {
            icon: <FiLoader className="animate-spin" size={18} color="#d1d5db" />,
            style: {
                ...baseStyle,
                border: "1px solid #6b7280",
                color: "#d1d5db",
            },
        })
    },

    promise<T>(
        promise: Promise<T>,
        messages: PromiseMessages<T>
    ) {
        return toast.promise(promise, messages)
    },
}