// Plain JS with raw DOM API
(function () {

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
    const root = document.querySelector(`#${params.where}`);
    const option = root.getAttribute('data-option');

    const cart = document.createElement('div');
    cart.id = params.where;
    cart.innerHTML = `Shopping Cart - from ${params.id} with option=${option}`;

    root.parentNode.replaceChild(cart, root);

    if (params.id === "cart1") {
        // This cart will listen to any event that's coming through...
        document.addEventListener('counter.reset', () => {
            cart.innerHTML += '|RESET';
        });
    }
}());
