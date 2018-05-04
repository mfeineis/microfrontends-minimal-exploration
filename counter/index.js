import Elm from './src/Main.elm';

const getScriptParams = () => {
    try {
        throw new Error();
    } catch(e) {
        const lines = e.stack.split('\n');

        let callerIndex = 0;
        //Now walk though each line until we find a path reference
        for (let i = 0; i < lines.length; i += 1){
            if(!lines[i].match(/http[s]?:\/\//)) {
                continue;
            }

            callerIndex = i;
            break;
        }

        const params = {};
        lines[callerIndex].replace(/\?([^:]+):/, (_, search) => {
            search.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                params[key] = value;
            });
        });

        return params;
    }
};

const params = getScriptParams();
const script = document.querySelector(`#${params.where}`);

const flags = parseInt(script.getAttribute('data-initial-value')) || 0;

const root = document.createElement('div');
root.id = params.where;

script.parentNode.replaceChild(root, script);

const app = Elm.Main.embed(root, flags);

document.addEventListener('counter.reset', () => {
    app.ports.resetCounter.send(0);
});

app.ports.signalIncremented.subscribe(() => {
    document.dispatchEvent(new CustomEvent('counter.incremented', { detail: { info: "some information" } }));
});
