import { experimental_use } from "react"

export const getShortestDistance = (array , idx) => {

    const getDistanceFromA = array.map((el,_)=>el.distance[idx])
    const minValue = Math.min(...getDistanceFromA)
    const nearest = array.filter((el)=>el.distance[idx]===minValue).map((el,_)=>el._id)
    // const getIndex = getDistanceFromA.indexOf(minValue)
    // console.log("smallest",array , nearest)
    return nearest
}