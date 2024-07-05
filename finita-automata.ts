type StateStatus = 'draft' | 'published' | 'archived' |'deleted';

type State<T> = {
    status: T,
    avalableState: T[],
}

class FinitaAutomata<T> {
    private states: State<T>[]
    private currentStatus: T;

    private moveHistory: {
        statusFrom?: T ,
        statusTo: T,
        callback?: () => void 
    }[] = [];

    constructor(states: State<T>[], initialStatus: T) {
        this.states = states;

        const initStatus = this.states.find(state => state.status === initialStatus);

        if (initStatus){
            this.currentStatus = initStatus.status;
            
            this.saveHistory({
                statusTo:initStatus.status
            })
        } else {
            throw 'initial status not found in statuses';
        }
        
    }

    getStates(){
        return this.states;
    }

    getAvilableMoves(){
       return this.states.find(state => state.status === this.currentStatus)?.avalableState
    }

    isStatus(status: T){
        return this.currentStatus === status;
    }

    canMoveToStatus(status: T){
        return this.getAvilableMoves()?.includes(status);
    }

    moveToStatus(status: T, callback?: () => void){
        if(this.canMoveToStatus(status)){
            try{
                if (callback){
                    callback();
                }
                
                this.saveHistory({
                    callback,
                    statusFrom: this.currentStatus,
                    statusTo: status    
                })
                this.currentStatus = status;
            }catch{
                throw 'can`t call callback';
            }
        } else {
            throw `can't move to status ${status}`;
        }
    }

    getHistory(){
        return this.moveHistory.map(item => {
            return `${item.statusFrom ? `${item.statusFrom} -> ` : ''}${item.statusTo}`
        });
    }

    private saveHistory({statusFrom, statusTo, callback}: {statusFrom?: T, statusTo: T, callback?: () => void}) {
        this.moveHistory.push({
            statusFrom,
            statusTo,
            callback})
    }
}

const automata = new FinitaAutomata<StateStatus>([{
    status: 'draft',
    avalableState: ['published', 'deleted']
},
{
    status: 'published',
    avalableState: ['draft', 'archived']
},
{
    status: 'archived',
    avalableState: ['draft', 'deleted']
},
{
    status: 'deleted',
    avalableState: []
}], 'draft');

console.log(automata.getStates())
console.log(automata.getAvilableMoves())

automata.moveToStatus('published');

automata.moveToStatus('archived');

automata.moveToStatus('deleted');


console.log(automata.getHistory())