const Linker = (path: string, params: Record<string, string | number>) => {
    let newPath = path;
    for (const key in params) {
        newPath = newPath.replace(`:${key}`, encodeURIComponent(String(params[key])));
    }
    return newPath;
};

export default Linker;