const Meals = [
    'Breakfast', 
    'Brunch', 
    'Lunch', 
    'Afternoon Tea', 
    'Dinner', 
    'Midnight Sanck'];

const Feelings = {
    'Excellent': 'emoticon-cool-outline',
    'Good': 'emoticon-happy-outline',
    'So So': 'emoticon-neutral-outline',
    'Not Well': 'emoticon-sad-outline',
    'Awful': 'emoticon-poop'
};

const FeelingRate = {
    'Excellent': 5,
    'Good': 4,
    'So So': 3,
    'Not Well': 2,
    'Awful': 1
};

const Allergens = {
    'milk': ['butter', 'cheese', 'creame', 'yogurt', 'mozzarella'],
    'egg': [],
    'nut': ['cashew', 'walnut', 'almond'],
    'peanut': [],
    'soy': [],
    'fish': ['gadus', 'trout'],
    'shell': ['crab', 'prown', 'oyster', 'inkfish', 'clam'],
    'gluten': ['wheat'],
    'celery': [],
    'sesame': []
}

const Symptoms = [
    'Diarrhea',
    'Bloating',
    'Rashes',
    'Headaches',
    'Nausea',
    'Fatigue',
    'Abdominal Pain',
    'Runny Nose',
    'Reflux',
    'Flushing of Skin'
];

export default { Meals, Feelings, Symptoms, FeelingRate, Allergens };