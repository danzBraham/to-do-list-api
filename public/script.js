$(function () {
  const createForm = $('.create-form');
  const editForm = $('.edit-form');
  const formInput = $('form input');
  const formAlertCreate = $('.container-form .form-alert');
  const formAlertEdit = $('.modal .form-alert');
  const containerTodo = $('.container-todo');
  const loading = $('.loading-text');
  const todosDiv = $('.todos');
  const modal = $('.modal');
  const closeBtn = $('.close-btn');

  // Get All Todos
  const showTodos = async () => {
    loading.css('display', 'flex');
    try {
      const {
        data: { todos },
      } = await axios.get('/api/v1/todos');
      if (todos.length < 1) {
        containerTodo.html(
          '<h5 class="empty-list">No task in your to do list</h5>'
        );
        loading.hide();
        return;
      }
      const alltodos = todos
        .map((todo) => {
          const { _id: todoID, completed, name } = todo;
          return `<div class="todo ${completed && 'todo-completed'}">
                    <h3>${name}</h3>
                    <div class="icon">
                      <button class="edit-btn" data-id="${todoID}"><i class="fa-solid fa-pen"></i></button>
                      <button class="delete-btn" data-id="${todoID}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                  </div>`;
        })
        .join('');
      todosDiv.html(alltodos);
    } catch (error) {
      containerTodo.html(
        '<h5 class="empty-list">There was an error, please try again later...</h5>'
      );
    }
    loading.hide();
  };

  showTodos();

  // Create Todo
  createForm.submit(async (e) => {
    e.preventDefault();
    const name = formInput.val();

    try {
      await axios.post('/api/v1/todos', { name });
      showTodos();
      formInput.val(null);
      formAlertCreate.css('display', 'block');
      formAlertCreate.text('Successfully Added Todo!');
      formAlertCreate.addClass('success');
    } catch (error) {
      formAlertCreate.css('display', 'block');
      formAlertCreate.text('Failed to Add Todo!');
      formAlertCreate.addClass('failed');
    }

    setTimeout(() => {
      formAlertCreate.hide().removeClass('success failed');
    }, 3000);
  });

  // Update Todo
  todosDiv.on('click', async (e) => {
    const el = $(e.target);
    if (el.parent().hasClass('edit-btn')) {
      const id = el.parent().data('id');
      try {
        const {
          data: { todo },
        } = await axios(`/api/v1/todos/${id}`);
        const { _id, name, completed } = todo;
        $('input#id').val(_id);
        $('input#name').val(name);
        if (completed) {
          $('input#completed').prop('checked', true);
        }
        modal.css('display', 'flex');
      } catch (error) {
        console.log(error);
      }
    }
  });

  editForm.submit(async (e) => {
    const id = $('input#id').val();
    e.preventDefault();
    try {
      await axios.patch(`/api/v1/todos/${id}`, {
        name: $('input#name').val(),
        completed: $('input#completed').prop('checked'),
      });
      showTodos();
      formAlertEdit.css('display', 'block');
      formAlertEdit.text('Successfully Edit Todo!');
      formAlertEdit.addClass('success');
    } catch (error) {
      console.log(error);
      formAlertEdit.css('display', 'block');
      formAlertEdit.text('Failed to Edit Todo!');
      formAlertEdit.addClass('failed');
    }

    setTimeout(() => {
      formAlertEdit.hide().removeClass('success failed');
    }, 3000);
  });

  closeBtn.on('click', (e) => {
    $('.modal input').val(null);
    modal.hide();
  });

  // Delete Todo
  todosDiv.on('click', async (e) => {
    const el = $(e.target);
    if (el.parent().hasClass('delete-btn')) {
      const id = el.parent().data('id');
      try {
        await axios.delete(`/api/v1/todos/${id}`);
        showTodos();
      } catch (error) {
        console.log(error);
      }
    }
  });
});
