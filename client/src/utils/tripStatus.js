export const getTripStatus = (startDate, endDate) => {
    if (!startDate || !endDate) return 'pending';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    if (end < today) return 'completed';
    if (start <= today && today <= end) return 'active';
    return 'pending';
};
