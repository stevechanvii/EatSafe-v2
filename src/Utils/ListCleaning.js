import React  from 'react';

// const onlyUnique = (value, index, self) => { 
function onlyUnique(value, index, self){
    return self.indexOf(value) === index;
}

export default onlyUnique;