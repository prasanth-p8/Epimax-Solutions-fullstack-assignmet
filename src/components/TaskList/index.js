import { MdDeleteForever } from "react-icons/md";
import './index.css'

const TaskList = props => {
    const {task,taskStatus, deleteTask} = props;
    const {id,taskName, taskDescription,dueDate,status } = task;

    const changeStatus = event => {
        taskStatus(event.target.value, id)
    }

    const deteleButton = () => {
        deleteTask(id)
    }

    return(
        <li className="task-item">
            <div className='top-task-item-container'>
                <div>
            <h1 className='task-item-heading'>{taskName}</h1>
            <p>{taskDescription}</p>
            </div>
            <button onClick={deteleButton} className="delete-button">
            <MdDeleteForever size={25}  />
            </button>
            </div>
            <div className='task-item-status-container'>
            <p>{dueDate}</p>
            <select value={status} className='status-option'  onChange={changeStatus}>
                <option value='CREATED'>CREATED</option>
                <option value='STARTED'>STARTED</option>
                <option value='COMPLETED'>COMPLETED</option>
            </select>
            </div>
        </li>
    )
}

export default TaskList