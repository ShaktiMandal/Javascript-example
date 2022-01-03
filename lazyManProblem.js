var lazyMan = (name, fn) => {

    return new extendedLazyMan(name, fn);
}

class extendedLazyMan {
    constructor(name, fn)
    {
        this.name = name;
        this.fn = fn;
        this.task = [];
        this.actions = [];

        this.intro(name);

        setTimeout(()=> {
            this.getNextAction();
        }, 0);
    }

    intro = () => {
        this.actions.push(['great']);
        return this;
    }

    eat = (food) => {
        this.actions.push(['eat', food]);
        return this;
    }

    sleep = (param) => {
        this.actions.push(['sleep', param]);
        return this;
    }

    sleepFirst = (param) => {
        this.actions.push(['sleep', param]);
        return this;
    }

    getNextAction = () => {
        let action = this.actions.shift();
        if(action)
        {
            const [type, param] = action;

            switch(type)
            {
                case "sleep":
                    {
                        setTimeout(()=>{
                            this.fn(`Wake up after ${param} second${param > 1 ? 's' : ''}.`);
                            this.getNextAction();
                        }, param * 1000);
                        return;
                    }

                    case "eat":
                        {
                            this.fn(`Eat, ${this.param}`);
                            return;
                        }
                        case "greet":
                            {
                                this.fn(`greet, ${param}`);
                                return;
                            }
            }
        }       
    }
}

lazyMan("test", console.log).eat("mango");