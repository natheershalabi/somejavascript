var events = {
    events: {},
    on: function(eventName, fn){
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function(eventName, fn){
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
              if (this.events[eventName][i] === fn) {
                this.events[eventName].splice(i, 1);
                break;
              }
            };
          }
    },
    emit: function(eventName, data){
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
              fn(data);
            });
        }
    }
};

var stats = (function(){
    var people = 0;

    //cache DOM
    var $stats = $('#statsModule');
    var template = document.getElementById("stats-template").innerHTML;

    //bind events
    events.on('peopleChanged', setPeople);
    _render();

    function _render() {
        $stats.html(Mustache.render(template, {people: people}));
    }

    function setPeople(newPeople) {
        people = newPeople;
        _render();
    }

});

var people = (function(divId, value){
    console.log(value);
    if(value){
        stats();
    }
    var people = []

    //to cashe DOM
    var $el = $(`#${divId}`)
    var $button = $el.find('button')
    var $input = $el.find('input')
    var $ul = $el.find('ul')
    var template = $el.find('#people-template').html()

    //bind events
    $button.on('click', addPerson);
    $ul.delegate('i.del', 'click', deletePerson);

    render();

    function render() {
        $ul.html(Mustache.render(template, {people: people}));
        events.emit("peopleChanged", people.length);

    }

    function addPerson(){
        var name = $input.val()
        people.push(name);
        render()
        $input.val('')
    }
 

    function deletePerson(event){
        var $remove = $(event.target).closest('li');
        i = $ul.find('li').index($remove);
        people.splice(i, 1);
        render();
    }
    function publicAPI() {
        addPerson,
        deletePerson
    };
    return publicAPI;

    
});

var people1 = people('peopleModule', false);

var people2 = people('peopleModule1', true);