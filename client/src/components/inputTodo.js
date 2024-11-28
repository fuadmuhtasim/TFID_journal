import { Button } from "bootstrap";
import React, { Fragment, useState } from "react";

const InputTodo = () => {
    //description is the state and the only way to change state is setDescription and useState shows the default value
    const [description , setDescription] = useState("");
    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            const body = {description};
        //     const response = await fetch("http://localhost:5000/todos", {
        //         method: "POST",
        //         headers: {"Content-Type":"application/json"},
        //         body: JSON.stringify(body)
        //     });
        // console.log(response);
        console.log(body);
        }
        catch(err){
            console.error(err.message);
        }
    }

    return (
        //onChange = {e => setDescription(e.target.value)} 
        //This entire thing: {e => setDescription(e.target.value)} : is a function (event handler function) that takes e as parameter and calls the function setDescription with parameter e.target.value 
        //This event handler function is triggered when the target.value changes. Here target is the <input/> and value is {description} initially which is a string.
        //onChange is like a hook or listener that waits for the event and calls the handler when it occurs.
        //setDescription is a state updater function provided by the useState hook in React.
        <Fragment>
        <h1 className="text-center mt-5">Pern Todo List</h1>
        <form className = "d-flex mt-5" onSubmit={onSubmitForm}>
            
            <input type = "text" className = "form-control" value = {description} onChange = {e => setDescription(e.target.value)}/>
                <button className="btn btn-success">
                    Add
                </button>
        </form>
        </Fragment>
    );
};

export default InputTodo;