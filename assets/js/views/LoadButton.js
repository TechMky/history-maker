var FileLoader = require('../models/FileLoader');
var LoadFileInput = require('./LoadFileInput');

module.exports = Backbone.View.extend({
    events: {
        'click': 'doLoad',
    },
    doLoad: function() {
        var element = $.parseHTML('<div>');

        var fileLoader = new FileLoader({
            fileType: 'JSON diagram',
            validExtensions: ['.dia.json'],
        });

        var fileInput = new LoadFileInput({
            el: element,
            model: fileLoader
        });

        var self = this;

        var box = bootbox.dialog({
            title: 'Load Diagram',
            message: element,
            onEscape: true,
            buttons: {
                success: {
                    label: 'Load',
                    className: 'btn-success',
                    callback: function() {
                        fileLoader.loadFileContents(function(json) {
                            fileInput.remove();

                            try {
                                var data = JSON.parse(json);
                                var q = data.q || '';
                                var a = data.a || '';

                                self.model.fromJSON(data);
                                window.updateQAndA(q, a);
                            } catch (e) {
                                console.log(e);
                                bootbox.alert('Unable to load diagram - invalid file');
                            }
                        });
                    },
                },
            }
        });

        var submitOnEnterKeyPress = function(event) {
            if (event.which == 13) {
                $('.btn-success', box).trigger('click');
            }
        };

        box.on('hidden.bs.modal', function () {
            $(document).off('keypress', submitOnEnterKeyPress);
        });

        $(document).on('keypress', submitOnEnterKeyPress);
    },
});
