import React from 'react';

/**
 * @func allergensDetctor grab the allergens and compare with in the list, and return a list
 * @param {Object} allergenObj is the object contains allergens(key) that user suffering and byproducts(value) predefined in Preference
 * @param {Array} ingredientsList is the list of detected ingredients
 */
const allergensDetctor = (allergenObj, ingredientsList) => {
    const detected = [];
    // use search, once the substring match the condition, it will return position, or return -1
    ingredientsList.map(ingredient => {
        // search key
        Object.entries(allergenObj).forEach(([key, value]) => {
            if (ingredient.toLowerCase().search(key) > -1) {
                detected.push(key);
            }
            // search value
            if (value) {
                value.map(byproduct => {
                    if (ingredient.toLowerCase().search(byproduct) > -1) {
                        detected.push(byproduct + ' (' + key + ')');
                    }
                });
            }
        });
    });
    return detected;
}

export default allergensDetctor;