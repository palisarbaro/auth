export function addResponseOkFuncToResObject(req, res, next){
    res.responseOk = function(obj){
        if(!obj){
            obj = {}
        }
        if(Array.isArray(obj)){
            throw new Error('Arrays are not allowed')
        }
        if(typeof obj !== 'object'){
            obj = { data: obj }
        }
        return this.json({ ...obj, status: 'ok' })
    }
    next()
}