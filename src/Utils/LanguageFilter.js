/**
 * @class languageFilter removes the allergens which is not english, it return a list
 * @param {String} allergens e.g. 'en:milk,en:soy,de:oyld'
 */
const languageFilter = (allergens) => {
    let allergenList = [];
    allergens.split(',').map(el => {
        if (el.substring(0, 2) === 'en') {
            let allergen = el.substring(3).toLowerCase();
            allergenList.push(allergen.charAt(0).toUpperCase() + allergen.slice(1));
        }
    });
    // if (allergenList.length === 0) {
    //     return false;
    // }
    return allergenList;
}

export default languageFilter;