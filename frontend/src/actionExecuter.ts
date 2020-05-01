
export interface IAction
{
    invoke(): void;
    finished(): boolean;
}

export class ActionExecuter implements IAction
{
    private _actions: IAction[];
    private _currentActionIndex: number = 0;

    constructor(...actions: IAction[])
    {
        this._actions = actions;
        setInterval(() => this.tick(), 100)
    }

    tick()
    {
        if(this._actions[this._currentActionIndex].finished() && this._currentActionIndex < this._actions.length - 1)
        {
            this._actions[this._currentActionIndex + 1].invoke();
            this._currentActionIndex++;
        }
    }

    invoke(): void
    {
        this._actions[0].invoke();
    }

    finished(): boolean
    {
        return this._actions[this._actions.length - 1].finished();
    }

}