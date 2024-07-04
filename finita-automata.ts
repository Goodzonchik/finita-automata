type StateStatus = 'draft' | 'published' | 'deleted';

type State<T> = {
    status: T,
    avalableState: T[],
}

class FinitaAutomata<T> {
    private states: State<T>[]

    private currentStatus: State<T>;

    constructor(states: State<T>[], initialStatus: T) {
        this.states = states;


        const initStatus = this.states.find(state => state.status === initialStatus);

        if (initStatus){
            this.currentStatus = initStatus;
        } else {
            throw 'initial status not found in statuses';
        }
        
    }

    getStates(){
        console.log(this.states);
    }
}

const x = new FinitaAutomata<StateStatus>([{
    status: 'draft',
    avalableState: ['published', 'deleted']
},
{
    status: 'published',
    avalableState: ['draft', 'deleted']
}], 'draft');

console.log(x.getStates())