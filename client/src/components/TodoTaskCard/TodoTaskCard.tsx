import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { deleteTodoTask } from "../../api/deleteTodo";
import { TodoCards, getTodosTask } from "../../api/getTodos";
import { createTodo } from "../../api/createTodo";

import { RiCloseFill } from "react-icons/ri";
type FormValues = {
  todoCardTitle: string;
};

export const TodoTaskCard = ({}) => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const [todos, setTodos] = useState<TodoCards[]>([]);
  const [animateCss] = useState("animate__animated  animate__rubberBand");
  const [title, setTitle] = useState("");
  const [isTodoDone, setisTodoDone] = useState(Boolean);
  const form = useForm<FormValues>({ mode: "all" });
  const { register, handleSubmit, formState } = form;

  const { errors, isValid, isSubmitting } = formState;
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("form error", errors);
  };

  const onSubmit = async (data: FormValues) => {
    setisTodoDone(false);
    console.log("sucessful POST to DB. submitted todo was:", data);
    await sleep(2000);

    handleCreateTodoTask();
  };

  //  ====  Get data from Api ===
  // handleCreateTodoTask
  // handleDeleteTodoTask
  // fetchTodos

  async function handleCreateTodoTask() {
    setisTodoDone(true);
    const todo = await createTodo(title);
    setTodos([...todos, todo]);
    setTitle("");
  }

  async function handleDeleteTodoTask(taskId: string) {
    await deleteTodoTask(taskId);
    // performant optimistic on the front end using state filter
    setTodos(todos.filter((todo) => todo._id !== taskId));
  }

  useEffect(() => {
    console.log("app is ready");
    async function fetchTodos() {
      const newTodos = await getTodosTask();
      setTodos(newTodos);
    }
    fetchTodos();
  }, []);

  return (
    <>
      <div className="AppUI__todos__results">
        <ul className="AppUI__todos__list" role="collection of todo notes">
          {todos.map((todo) => (
            <li
              className={`AppUI__todos__list__listitem  ${animateCss} `}
              key={todo._id}
            >
              {todo.title}
              <button
                className="AppUI__todos__list__listitem__button "
                onClick={() => {
                  handleDeleteTodoTask(todo._id);
                }}
              >
                <RiCloseFill />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="AppUI__form"
        role="form"
        aria-label="Add Todo Information"
      >
        <label htmlFor="input-todo-title" className="AppUI__input-text__label">
          Add your title
        </label>

        <input
          className="AppUI__input-text"
          id="input-todo-title"
          type="text"
          aria-placeholder="Please enter a task todo"
          placeholder={"Please enter a task todo"}
          {...register("todoCardTitle", {
            maxLength: {
              value: 30,
              message: "Sorry! A maximum 30 characters allowed only",
            },
            required: {
              value: true,
              message: "field is required",
            },
            minLength: {
              value: 6,
              message:
                "Whoopse! You need a minimum of 6 characters to complete a Todo Task ",
            },
          })}
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />

        <button
          className="AppUI__form__submit-button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          create todo
        </button>
      </form>
      <section role="tooltip" className="AppUI__form__tooltips">
        <p className="AppUI__form__alert-validation" role="alert">
          {errors.todoCardTitle?.message}
        </p>
        {isSubmitting && (
          <p
            role="alert"
            className="AppUI__form__alert-validation-success animate__animated animate__heartBeat"
          >
            Todo is Submitting...
          </p>
        )}

        {isTodoDone ? (
          <>
            <p
              role="alert"
              className="AppUI__form__alert-submitted animate__animated animate__rubberBand  animate__delay-2s animate__fadeOut"
            >
              Done!
            </p>
          </>
        ) : null}
      </section>
    </>
  );
};
