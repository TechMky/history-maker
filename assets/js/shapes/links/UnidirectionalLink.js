module.exports = joint.shapes.history.GenericLink.extend({
    defaults: joint.util.deepSupplement({
        type: 'history.links.UnidirectionalLink',
        attrs: {
            '.marker-source': { fill: '#4b4a67', stroke: '#4b4a67', d: 'M 0 0 L 0 10 L 5 10 L 5 0 z'},
            '.marker-target': { fill: '#4b4a67', stroke: '#4b4a67', d: 'M 10 0 L 0 5 L 10 10 z' },
        },
    }, joint.shapes.history.GenericLink.prototype.defaults),
});
