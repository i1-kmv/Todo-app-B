import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../new-item-form";


class App extends Component  {

   state = {
       todoData: [
           this.createToDoItem("Drink coffee"),
           this.createToDoItem("Make awesome App"),
           this.createToDoItem("Walk with beagle"),
       ],
       term: ''
   };



   createToDoItem(label) {
       return {
       label,
       important: false,
       done: false,
       id:Math.random()
       }
   }

   onDeleteClick = (id) => {
       this.setState(({todoData}) => {
           const idx = todoData.findIndex((el) => el.id == id);

           const newArray = [
               ...todoData.slice(0, idx),
               ...todoData.slice(idx+1)];

           return {
               todoData: newArray
           }

       })
    }

    onAddItem = (label) => {
        this.setState(({todoData}) => {
            const newItem = {label, important: true, id:Math.random()};

            const newArray = [
                ...todoData,
                newItem];

            return {
                todoData: newArray
            }

        })
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id == id);

            const oldItem = todoData[idx];
            const newItem = {...oldItem, important: !oldItem.important}

            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx+1)];

            return {
                todoData: newArray
            }

        })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id == id);

            const oldItem = todoData[idx];
            const newItem = {...oldItem, done: !oldItem.done}

            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx+1)];

            return {
                todoData: newArray
            }

        })
    }

    search(items, term) {
       if (term.length == 0) {
           return items;
       }

       return items.filter((item) => {
           return item.label.indexOf(term) > -1;
       })
    }

    onSearchChange = (term) => {
       this.setState({term});
    }
   render() {
       const {todoData, term} = this.state;
       const visibleItems = this.search(todoData, term);
       const doneCount = this.state.todoData.filter((el) => el.done).length;
       const todoCount = this.state.todoData.length - doneCount;
       return (
           <div className="todo-app">
               <AppHeader toDo={todoCount} done={doneCount} />
               <div className="top-panel d-flex">
                   <SearchPanel onSearchChange = {this.onSearchChange} />
                   <ItemStatusFilter />
               </div>

               <TodoList todos={visibleItems}
                         onDeleteClick={this.onDeleteClick}
                         onToggleImportant = {this.onToggleImportant}
                         onToggleDone = {this.onToggleDone}/>
               <ItemAddForm onAdd = {this.onAddItem}/>
           </div>
       );
   }
};

export default App;