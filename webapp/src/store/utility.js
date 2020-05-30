export const updateObject =(oldObject, updatedState)=>{
    return{
        ...oldObject,
        ...updatedState
    }
};