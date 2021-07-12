import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle.trim() === "") {
      // usando o trim ele impede que tasks que tenham conteúdo somente de espaços passem na validação
      return
    }

    // passando conteúdo para a nova task
    const newTask = {
      id: Math.floor(Math.random() * 100),
      title: newTaskTitle,
      isComplete: false
    };
    // mantendo a imutabilidade da aplicação passamos para o estado da task um novo valor em vez de alterar o valor existente
    setTasks([...tasks, newTask]);
    // --- forma sugerida na resolução oficial
    // --- setTasks(oldState => [...oldState, newTask]);

    //limpando campo do input
    setNewTaskTitle('');

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // procura no array de tasks a task com id igual ao recebido nos parâmetros
    const taskCompleted = tasks.map((task) => {
      if (task.id === id) {
        // quando encontra trocar o estado do isComplete para o valor contrário do que já está
        task.isComplete = !task.isComplete;
        // retorna a task para o array de taskCompleted
        return task;
      }
      // caso o id seja diferente mantém a task com valor original e retorna para array de taskCompleted
      return task;
    });
    // seta o array de tasks com o novo array de taskCompleted
    setTasks(taskCompleted);

    // solução oficial com operador ternário:
    // const newTasks = tasks.map((task) => task.id === id ? {
    //   ...task,
    //   isComplete: !task.isComplete
    // } : task);

    // setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // filtra todas as tasks com id diferente do id que queremos deletar
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}