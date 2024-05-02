import {Component} from 'react'
import { FaPlusCircle } from "react-icons/fa";
import {v4 as uuidv4} from 'uuid'

import './index.css'
import TaskList from '../TaskList';

const taskStatusContants = {
    created: "CREATED",
    started: "STARTED",
    completed:"COMPLETED"
}

class Home extends Component{
    state = {
        taskName:"",
        taskDescription:'',
        dueDate :"mm/dd/yyyy",
        taskList: [],
        errorMsgTitle:false,
        errorMsgDescription:false,
        errorMsgDate:false
      }

      addNewTask = event => {
        event.preventDefault()
        const {taskDescription,taskName,dueDate} = this.state
        if(taskName && taskDescription && dueDate !== ""){
            const newTask = {
                id: uuidv4(),
                taskName,
                taskDescription,
                dueDate,
                status:taskStatusContants.created
            }
            
            this.setState(prevState => ({errorMsgTitle:false,
                errorMsgDescription:false,
                errorMsgDate:false, dueDate:"mm/dd/yyyy",taskList: [...prevState.taskList, newTask],taskName:"",taskDescription:""}))    
        }
        else{
            this.setState({errorMsgTitle:true,
                errorMsgDescription:true,
                errorMsgDate:true
                })
        }
        
    }

    changeTaskName = event => {
        if(event.target.value === ""){
            this.setState({errorMsgTitle:true,taskName:''})
        }else{
            this.setState({errorMsgTitle:false, taskName:event.target.value})
        }
    }

    
    changeTaskDescription = event => {
        if(event.target.value === ""){
            this.setState({errorMsgDescription:true,taskDescription:""})
        }else{
            this.setState({errorMsgDescription:false, taskDescription:event.target.value})
        }
    }
    changeDueDate = event => {
        if(event.target.value === ""){
            this.setState({errorMsgDate:true,dueDate:"mm/dd/yyyy"})
        }else{
            this.setState({errorMsgDate:false, dueDate:event.target.value})
        }
    }

    getCreatedTaskCount = () => {
        const {taskList} = this.state

        const createdCount =  taskList.filter(eachTask => eachTask.status === "CREATED")
        
        return createdCount
    }

    getStartedTaskCount = () => {
        const {taskList} = this.state

        const startedCount =  taskList.filter(eachTask => eachTask.status === "STARTED")
        
        return startedCount
    }

    getCompletedTaskCount = () => {
        const {taskList} = this.state

        const completedCount =  taskList.filter(eachTask => eachTask.status === "COMPLETED")
        
        return completedCount
    }
    changeTaskStatus = (status,id) => {
        const {taskList} = this.state

        const updateTaskList = taskList.map(eachTask => 
            {
            if( id === eachTask.id){
                return({...eachTask,status})
            }

            return eachTask
        })

        this.setState({taskList:updateTaskList})
    }

    deleteTaskItem = id => {
        const {taskList} = this.state
        console.log(id)
        const updateTaskList = taskList.filter(eachTask => eachTask.id !== id)
        
        this.setState({taskList:updateTaskList})
    }

    renderTaskList = () => {
        const {taskList} = this.state 

        if(taskList.length === 0){

            return( 
            <div className='no-task-container'>
                <img src="https://cdn-icons-png.flaticon.com/512/5058/5058432.png" alt='no-task' className='no-task-image' />
                <h1 className='no-task-text'>No Task Created</h1>
            </div>)
        }

        return(
            <ul className='task-list'>
            {taskList.map(eachTask => <TaskList key={eachTask.id} deleteTask={this.deleteTaskItem} task={eachTask} taskStatus={this.changeTaskStatus}/>)}
            </ul>
        )
    }



    render(){
    const {taskDescription,taskName,dueDate,errorMsgTitle,errorMsgDescription,errorMsgDate} = this.state

    const createdTask = this.getCreatedTaskCount()
    const startedTask = this.getStartedTaskCount()
    const completedTask = this.getCompletedTaskCount()
    
        

        return(
           
            <div className='main-container'>                
                <div className='left-panel'>
                    <ul className='tab-list'>
            
                        <li className='tab-item'>Dashboard</li>
            
            
                       <li className='tab-item'>Task</li>
            
                        
                    </ul>
                </div>
                <div className='create-task-container'>
                    <form onSubmit={this.addNewTask}>
                    <h1 className='create-task-heading'>Create New Task</h1>
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name: </label>
                        <input type="text" value={taskName} onChange={this.changeTaskName} className="form-control" id="taskName" placeholder="Task Name"/>
                    {errorMsgTitle && <p className='error-msg'>*Required</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDescription">Task Description:</label>
                        <textarea id="taskDescription" value={taskDescription} onChange={this.changeTaskDescription}  rows="4" cols="50" type="text" className="form-control"  placeholder="Task Description" ></textarea>
                        {errorMsgDescription && <p className='error-msg'>*Required</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date:</label>
                        <input type="date" className="form-control" value={dueDate} onChange={this.changeDueDate} id="dueDate"  />
                        {errorMsgDate && <p className='error-msg'>*Required</p>}
                    </div>
                    <div className="add-button-container">
                    <div className="add-button">
                    <FaPlusCircle color='#ffffff'/>
                        <button type='submit' className='add-task-button'>Add Task</button>
                        </div>
                    </div>
                    </form>
                    <div className='task-status-container'>
                        <h1>Task Status:</h1>
                        <div className='status-container'>
                            <h3>Created</h3>
                            <h2 className='task-count'>{createdTask.length}</h2>
                        </div>
                        <div className='status-container started'>
                        <h3>Started</h3>
                            <h2 className='task-count'>{startedTask.length}</h2>
                        </div>
                        <div className='status-container completed'>
                        <h3>Completed</h3>
                            <h2 className='task-count'>{completedTask.length}</h2>
                        </div>
                    </div>
                    <div className='task-container'>
                    <h1 className='task-heading'>TASK</h1>
                <div>
                    {this.renderTaskList()}
                </div>
            </div>
                </div>
            </div>
            
            
        )
    }
}

export default Home