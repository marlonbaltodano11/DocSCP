/**
 * Removes null, undefined or empty values from an object.
 * @param {Object} data - The object to clean.
 * @returns {Object} The cleaned object with no null, undefined or empty string values.
 */
export const cleanObject = (data) => {
    const cleanedData = {};

    for (const key in data) {
        const value = data[key];
        if (value !== null && value !== undefined && value !== "") {
            cleanedData[key] = value; // Only add non-null, non-undefined, non-empty values
        }
    }

    return cleanedData;
};

/**
 * Appends a key-value pair to FormData, handling nested objects, arrays, and file lists.
 * @param {FormData} formData - The FormData object to append to.
 * @param {string} key - The key or field name.
 * @param {*} value - The value to append; can be an object, array, file, or file list.
 */
export const appendToFormData = (formData, key, value) => {
    if (Array.isArray(value) && value[0] instanceof File) {
        // If the value is an array of files, append each file individually
        value.forEach((file, _) => {
            formData.append(key, file);
        });
    } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value)); // Convert other arrays to JSON strings
    } else if (value instanceof Object && !(value instanceof File)) {
        // Recursively append for nested objects
        Object.keys(value).forEach((subKey) => {
            appendToFormData(formData, `${key}.${subKey}`, value[subKey]);
        });
    } else {
        formData.append(key, value); // Append primitive types or files directly
    }
};

/**
 * Converts an object to a FormData instance, handling nested objects and arrays.
 * Before conversion, it cleans the object to remove null, undefined or empty string values.
 * @param {Object} body - The object to convert into FormData.
 * @returns {FormData} The FormData instance containing the cleaned object's data.
 */
export const convertToFormData = (body) => {
    const cleanedBody = cleanObject(body); // Clean the object before converting
    const formData = new FormData();

    if (cleanedBody) {
        Object.keys(cleanedBody).forEach((key) => {
            appendToFormData(formData, key, cleanedBody[key]);
        });
    }
    return formData;
};