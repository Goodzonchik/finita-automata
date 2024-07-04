var FinitaAutomata = /** @class */ (function () {
    function FinitaAutomata(states, initialStatus) {
        this.states = states;
        var initStatus = this.states.find(function (state) { return state.status === initialStatus; });
        if (initStatus) {
            this.currentStatus = initStatus;
        }
        else {
            throw 'initial status not found in statuses';
        }
    }
    FinitaAutomata.prototype.getStates = function () {
        console.log(this.states);
    };
    return FinitaAutomata;
}());
var x = new FinitaAutomata([{
        status: 'draft',
        avalableState: ['published', 'deleted']
    },
    {
        status: 'published',
        avalableState: ['draft', 'deleted']
    }], 'draft');
console.log(x.getStates());
