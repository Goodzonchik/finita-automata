type StateStatus = 'draft' | 'published' | 'archived' |'deleted';

type State<T> = {
    status: T,
    avalableState: T[],
}

type MoveHistory<T> = {
    statusFrom?: T ,
    statusTo: T,
}

class FinitaAutomata<T> {
    private states: State<T>[]
    private currentStatus: T;

    private moveHistory: MoveHistory<T>[] = [];

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

    get status(): T{
        return this.currentStatus;
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

    moveToStatus(status: T){
        if(this.canMoveToStatus(status)){
            this.saveHistory({
                statusFrom: this.currentStatus,
                statusTo: status    
            })
            this.currentStatus = status;
        } else {
            throw `can't move to status ${status}`;
        }
    }

    getHistory(){
        return this.moveHistory.map(item => {
            return `${item.statusFrom ? `${item.statusFrom} -> ` : ''}${item.statusTo}`
        });
    }

    private saveHistory({statusFrom, statusTo}: MoveHistory<T>) {
        this.moveHistory.push({
            statusFrom,
            statusTo})
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

automata.moveToStatus('published');
console.log(automata.status);

automata.moveToStatus('archived');

automata.moveToStatus('deleted');

console.log(automata.getHistory())