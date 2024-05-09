export function resolvePadding(paddingNum, size) {
    // check of the paddingNum is a decimal between 0 and 1
    // if it is, return a number that is the percentage of the size
    if (paddingNum >= 0 && paddingNum <= 1) {
        return paddingNum * size;
    }
    return paddingNum;
}
export function ensurePadding(padding) {
    if (Array.isArray(padding)) {
        return {
            top: padding[0],
            right: padding?.[1] ?? padding[0],
            bottom: padding?.[2] ?? padding[0],
            left: padding?.[3] ?? padding?.[1] ?? padding[0] ?? 0,
        };
    }
    if (typeof padding === 'number') {
        return { top: padding, right: padding, bottom: padding, left: padding };
    }
    else if (typeof padding === 'object') {
        const paddingAsPointLike = padding;
        if (paddingAsPointLike.x !== undefined && paddingAsPointLike.y !== undefined) {
            return {
                top: paddingAsPointLike.y,
                right: paddingAsPointLike.x,
                bottom: paddingAsPointLike.y,
                left: paddingAsPointLike.x,
            };
        }
        else {
            return {
                top: padding.top ?? 0,
                right: padding.right ?? 0,
                bottom: padding.bottom ?? 0,
                left: padding.left ?? 0,
            };
        }
    }
    else {
        return { top: 0, right: 0, bottom: 0, left: 0 };
    }
}
