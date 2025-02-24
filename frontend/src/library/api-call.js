import axios from "axios";
import {axiosApiInstance} from "@/library/helper";
const getCategoryData = async()=>
{
return axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/category/get-data').then((response)=>
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
export {getCategoryData,MoveToTrashData};