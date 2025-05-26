export const initialStore = () => ({
  token: null,
  user: null,
  error: null,
  message: null,
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login_success":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
        message: "Login exitoso",
      };

    case "login_error":
      return {
        ...store,
        token: null,
        user: null,
        error: action.payload,
        message: null,
      };

    case "add_user_success":
      return {
        ...store,
        error: null,
        message: action.payload,
      };

    case "add_user_error":
      return {
        ...store,
        error: action.payload,
        message: null,
      };

    case "logout":
      return initialStore();

    case "clear_error":
      return {
        ...store,
        error: null,
        message: null,
      };

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

export const login = async (email, password, dispatch) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await resp.json();

    if (!resp.ok) throw new Error(data.msg || "Error de autenticación");

    // dispatch exitoso
    dispatch({
      type: "login_success",
      payload: {
        token: data.token,
        user: { email, id: data.user_id },
      },
    });
    return true
  } catch (err) {
    dispatch({ type: "login_error", payload: err.message });
  }
};

export const register = async (email, password, dispatch) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }
    );
    const data = await resp.json();

    if (!resp.ok) throw new Error(data.msg || "Error al registrar usuario");

    dispatch({ type: "add_user_success", payload: data.msg });
  } catch (err) {
    dispatch({ type: "add_user_error", payload: err.message });
  }
}
