import { useActionState, useOptimistic } from "react";

function UserForm() {
  // Define your action state which would return a current state, actionFunction to pass to form, and pending state
  // Pass your action function, and default state as arguments for the useActionState() hook
  const [currentState, actionFunction, isPending] = useActionState(
    submitFormAction,
    { name: localStorage.getItem("name") || "", error: null }
  );

  // improve perceived user performance significantly by using useOptimistic hook to provide real time updates
  // if update is not successful, would revert to previous state.
  const [optimisticName, setOptimisticName] = useOptimistic(currentState.name);

  async function exampleAsyncAction(yourName) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("name", yourName);
        resolve();
      }, 3000);
    });
  }

  //Define your formAction which would hold the previous state and the current form data.
  async function submitFormAction(prevState, formData) {
    // Get the name of the formData
    const name = formData.get("yourName");
    setOptimisticName(name);
    try {
      await exampleAsyncAction(name);
      //return the new state
      return { name, error: null };
    } catch (error) {
      console.error(error);
      return { error: error, name: prevState.name };
    }
  }

  return (
    <>
      <form action={actionFunction}>
        <h3>What would you like to be referred to?</h3>
        <input
          name="yourName"
          type="text"
          placeholder="Your name?"
          style={{ width: "90%" }}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Submit"}
        </button>
        {currentState.error && (
          <p style={{ color: "red" }}>There is an error!</p>
        )}
      </form>
      {/** Use the optimisticName value to show realtime name that doesn't rely on state updates */}
      <h4>Current Person Using App: {optimisticName} </h4>
    </>
  );
}

export default UserForm;
