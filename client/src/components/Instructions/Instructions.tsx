export default function Instructions() {
  return (
    <div className="AppUI__instructions">
      <code className="AppUI__instructions__copy">
        <span className="AppUI__instructions__title">
          #a-simple-todo-task-thingy
        </span>
        <p>{".about { "}</p>
        <p className="AppUI__instructions__css-spacer">{"add: tasks; "}</p>
        <p className="AppUI__instructions__css-spacer">{"remove: tasks;"}</p>
        <p className="AppUI__instructions__css-spacer">
          {"validation: accessible;"}
        </p>
        <p>{" }"}</p>
      </code>
    </div>
  );
}
