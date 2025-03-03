import axios from "axios";
import {axiosApiInstance} from "@/library/helper";
const getCategoryData = async(id=null)=>
{
    let api = '/category/get-data';
    if(id) api+=`/${id}`;

return axiosApiInstance.get(api).then((response)=>
{
return response.data;
} ).catch((error)=>
{
return null;
})
}
const getColorData = async(id=null)=>
    {
        let api = '/color/get-data';
        if(id) api+=`/${id}`;
    
    return axiosApiInstance.get(api).then((response)=>
    {
    return response.data;
    } ).catch((error)=>
    {
    return null;
    })
    }
const MoveToTrashData = async()=>
    {
    return axiosApiInstance.get( '/category/trash-get-data').then((response)=>
    {
    return response.data;
    } ).catch((error)=>
    {
    return null;
    })
    }
    const MoveToTrashColorData = async()=>
        {
        return axiosApiInstance.get( '/color/trash-get-data').then((response)=>
        {
        return response.data;
        } ).catch((error)=>
        {
        return null;
        })
        }
  
export {getCategoryData,MoveToTrashData,getColorData,MoveToTrashColorData};