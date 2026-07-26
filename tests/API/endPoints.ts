const baseUrl = "https://api.restful-api.dev";
const endPoints = "/objects";




async function getObjectsList (request:any){
const res = await request.get(baseUrl + endPoints);
return res;
}

async function getObjectById(request:any , id : number){
    const res = await request.get(baseUrl + endPoints, {
        params :  {
            id : id
        }
    });
    return res;
}

async function addObject (request:any){
    const addedObject = await request.post(baseUrl + endPoints , {
        data : {
           
  "name": "Apple MacBook Pro 16",
  "data": {
    "year": 2019,
    "price": 1849.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB"
  
}
},
Headers : {
    "Content-Type" : "application/json"
},

    });
    return addedObject;

}

async function deleteObject(request:any , id : string){
    const res = await request.delete(`${baseUrl}${endPoints}/${id}`);
    return res;
}





export default {getObjectsList, getObjectById, addObject, deleteObject};