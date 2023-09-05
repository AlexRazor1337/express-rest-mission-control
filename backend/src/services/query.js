export const getPagination = (pg, size) => {
    const page = parseInt(pg) || 1;
    
    const limit = parseInt(size) || 30;
    const skip = (page - 1) * size;
    
    return { limit, skip };
};
