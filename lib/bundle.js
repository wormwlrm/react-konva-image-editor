
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import React, { useState } from 'react';

var Counter = function () {
    var _a = useState(0), counter = _a[0], setCounter = _a[1];
    return (React.createElement("div", null,
        React.createElement("h4", null, "A react page bundled with Rollup.js 22 zz dd"),
        React.createElement("br", null),
        React.createElement("h1", null,
            "Counter: ",
            counter),
        React.createElement("br", null),
        React.createElement("button", { onClick: function () { setCounter(counter + 1); } }, "+ Increase"),
        React.createElement("br", null),
        React.createElement("button", { onClick: function () { setCounter(counter - 1); } }, "- Decrease")));
};

export { Counter };
//# sourceMappingURL=bundle.js.map
