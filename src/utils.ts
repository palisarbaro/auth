import { Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function responseOk(res: Response, obj: any){
    if(!obj){
        obj = {}
    }
    if(Array.isArray(obj)){
        throw new Error('Arrays are not allowed')
    }
    if(typeof obj !== 'object'){
        obj = { data: obj }
    }
    return res.json({ ...obj, status: 'ok' })
}