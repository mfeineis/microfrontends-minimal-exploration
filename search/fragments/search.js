// Plain JS CustomElement that uses the global polyfill you might want to agree on
// if you decide on using that integration route
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

    const option = root.getAttribute('data-correlation-id');
    const failFastFeature = root.hasAttribute('data-feature-failfast');

    if (!('customElements' in window)) {
        if (failFastFeature) {
            throw new Error('CustomElements are not supported, are you missing a polyfill?');
        } else {
            // Bail if something goes wrong
            const fallback = document.createElement('div');
            fallback.innerHTML = 'The search could not be loaded, please try again later';

            root.parentNode.replaceChild(fallback, root);

            console.error('CustomElements are not supported, are you missing a polyfill?');
            return;
        }
    }

    window.customElements.define('my-search', class extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
                <input type="text" placeholder="Search..." value=""/>
            `;

            this.querySelector('input').addEventListener('input', e => {
                console.log('input.value=', e.target.value);
            });

            // Remember to clean up your event handlers
        }
        // Cleanup, whatever...
    });

    const cart = document.createElement('my-search');
    cart.id = params.where;

    root.parentNode.replaceChild(cart, root);

}());
