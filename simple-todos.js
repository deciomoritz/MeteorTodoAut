TaskCollection = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    Template.body.helpers({
        getAllTasks: function(){
            var userId = Meteor.userId();
            return TaskCollection.find({createdBy: userId}, {sort: {createdAt: -1}});
        }
    });

    Template.body.events({
        "submit .new-task": function(event){
            event.preventDefault();

            var currentUserId = Meteor.userId();
            var text = event.target.text.value;

                TaskCollection.insert({
                    text: text,
                    createdAt: new Date(),
                    createdBy: currentUserId
                });
            event.target.text.value = "";
        }
    });

    Template.task.events({
        "click .toggle-checked": function () {
            TaskCollection.update(this._id, {
                $set: {
                    checked: !this.checked
                }
            });
        },
        "click .delete": function () {
            TaskCollection.remove(this._id);
        }
    });
}
