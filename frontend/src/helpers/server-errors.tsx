type ServerErrors = Record<string, string>;

const serverErrors = (errors: ServerErrors): Record<string, { type: string; message: string }> => {
    const parsed: Record<string, { type: string; message: string }> = {};
    Object.entries(errors).forEach(([key, message]) => {
        parsed[key] = {
            type: "server",
            message: message,
        };
    });
    return parsed;
};

export default serverErrors;
