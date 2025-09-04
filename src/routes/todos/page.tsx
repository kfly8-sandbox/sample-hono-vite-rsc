interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodosPageProps {
  todos: Todo[]
}

export function TodosPage({ todos }: TodosPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">TODO List</h1>

        <form action="/todos" method="POST" className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              name="text"
              placeholder="Add a new TODO"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No TODOs yet. Add one above!</p>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <span className="text-gray-800">{todo.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
