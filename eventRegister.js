
// listener (type):
// {
//     action:'',
//     group:'',
//     run(request){}
// }
const eventRegister = {
    GROUP:{
        CONTENT:'content',
        BACKGROUND:'background'
    },
    listeners:[],
    registerListener(listener){
        this.listeners.push(listener)
    },
    get(action,group){
        for(let i = 0;i < this.listeners.length;i++){
            let l = this.listeners[i]
            if(l.action === action && l.group === group){
                return l
            }
        }

        return null
    },
    exec(result,group){
        let action = result.request.action
        if(!action){
            throw "no request action found"
        }
        var listener = this.get(action,group)
        if(listener){
            listener.run(result)
        }
    }
}