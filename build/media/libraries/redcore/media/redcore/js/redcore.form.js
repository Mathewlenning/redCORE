/**
 * @copyright  Copyright (C) 2008 - 2016 redCOMPONENT.com. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
 */

// Only define the redCORE namespace if not defined.
redCORE = window.redCORE || {};

redCORE.form =
{
    getData: function(form, task)
    {
        var taskInput = redCORE.form.getInput('task', form);
        var orignialValue = taskInput.val();
        taskInput.val(task);

        var formData = form.serialize();

        taskInput.val(orignialValue);

        return formData;
    },

    getTarget:function(event)
    {
        var target = jQuery(event.currentTarget);

        // If the event bubbled up from an icon use the parent
        if (event.currentTarget.tagName == 'I')
        {
            target = jQuery(event.currentTarget.parentElement);
        }

        return target;
    },

    getInput: function (name, form)
    {
        var input = form.find('input[name ="' + name + '"]');

        if(typeof input.val() == 'undefined')
        {
            form.append('<input type="hidden" name="'+ name +'"/>');
            input = form.find('input[name ="' + name + '"]');
        }

        return input;
    },

    ajaxPost:function (form, task)
    {
        var settings = {
            url:  form.attr('action'),
            type:'POST',
            dataType: 'json',
            data: redCORE.getData(form, task)
        };

        return jQuery.ajax(settings);
    }
};
