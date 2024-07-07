class FinitaAutomata {
    states;
    currentStatus;
    moveHistory = [];
    constructor(states, initialStatus) {
        this.states = states;
        const initStatus = this.states.find(state => state.status === initialStatus);
        if (initStatus) {
            this.currentStatus = initStatus.status;
            this.saveHistory({
                statusTo: initStatus.status
            });
        }
        else {
            throw 'initial status not found in statuses';
        }
    }
    get status() {
        return this.currentStatus;
    }
    getStates() {
        return this.states;
    }
    getAvilableMoves() {
        return this.states.find(state => state.status === this.currentStatus)?.avalableState;
    }
    isStatus(status) {
        return this.currentStatus === status;
    }
    canMoveToStatus(status) {
        return this.getAvilableMoves()?.includes(status);
    }
    moveToStatus(status, callback) {
        if (this.canMoveToStatus(status)) {
            try {
                if (callback) {
                    callback();
                }
                this.saveHistory({
                    statusFrom: this.currentStatus,
                    statusTo: status
                });
                this.currentStatus = status;
            }
            catch {
                throw 'can`t call callback';
            }
        }
        else {
            throw `can't move to status ${status}`;
        }
    }
    getHistory() {
        return this.moveHistory.map(item => {
            return `${item.statusFrom ? `${item.statusFrom} -> ` : ''}${item.statusTo}`;
        });
    }
    saveHistory({ statusFrom, statusTo }) {
        this.moveHistory.push({
            statusFrom,
            statusTo
        });
    }
}
const automata = new FinitaAutomata([{
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
console.log(automata.getStates());
automata.moveToStatus('published');
console.log(automata.status);
automata.moveToStatus('archived');
automata.moveToStatus('deleted');
console.log(automata.getHistory());
