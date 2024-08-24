export const Todos = ({ todos }) => {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
