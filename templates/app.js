let todo=[];
let position="", data="", yesno="";
let input=prompt("enter 'list' to show all tasks, 'add' to add a task, 'delete' to remove a task and 'quit' to quit the app");
while(input!="quit"){
if(input==="list")
{
    alert("your List: "+todo)
}
else if(input==="add")
{
    position=prompt(`here is your list:[ ${todo} ]select the position where you want to add, please tell the index number`);
    data=prompt("what you want to add");
    todo.splice(position, 0, data);
    alert("information stored");
    yesno=prompt("Do you want to add more? press yes or no");
    while(yesno!="no")
    {
        position=prompt(`here is your list:[ ${todo} ]select the position where you want to add, please tell the index number`);
        data=prompt("what you want to add");
        todo.splice(position, 0, data);
        alert("information stored");
        yesno=prompt("Do you want to add more? press yes or no");
    }
}
else if(input==="delete")
{
    if(todo.length==0)
    {
        alert("nothing to delete");
    }
    else{position=prompt(`here is your list:[ ${todo} ]select the position where you want to delete, please select the index number`);
    todo.splice(position, 1);
    alert("information stored");
    yesno=prompt("Do you want to delete more, press yes or no");
    while(yesno!="no")
    {
        position=prompt(`here is your list:[ ${todo} ]select the position where you want to delete, please select the index number`);
        todo.splice(position, 1);
        alert("information stored");
        yesno=prompt("Do you want to delete more, press yes or no");
    }
    }
}
input=prompt("enter 'list' to show all tasks, 'add' to add a task, 'delete' to remove a task and 'quit' to quit the app");
}
if(input==="quit")
{
    alert("this is your stored list: "+todo)
    alert("thank you! visit again!");
}
