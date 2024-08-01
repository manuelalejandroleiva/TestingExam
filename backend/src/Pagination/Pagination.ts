export function setOFfsetLimit(offset: number, limit: number) {
    let offsets = 0;
    if (!isNaN(offset) && offset >= 0) {
        offsets = offset;
    }

    let size = 10;  // Default limit if not specified
    if (!isNaN(limit) && limit > 0 && limit < 3500) {
        size = limit;
    } else if (isNaN(limit)) {
        size = 3500;  // A sufficiently high value to ensure all records are returned
    }

    const offsetsa = offsets > 0 ? (offsets) * size : 0;

    return {
        limits: size,
        offsetsa: offsetsa,
        size: size
    };
}