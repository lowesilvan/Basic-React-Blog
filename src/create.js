import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('lowe');
    const [isPending, setIsPending] = useState(false);
    const redirect = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};

        setIsPending(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(blog)
        };
      
        fetch('http://localhost:8000/blogs', requestOptions)
        .then(response => response.json())
        .then(() => {
            setIsPending(false);
            console.log(blog);
            // redirect.go(-1);
            redirect.push('/');
        })
    }

    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input 
                    type = "text"
                    required
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body</label>
                <textarea
                    required
                    value = {body}
                    onChange = {(e) => setBody(e.target.value)}
                >

                </textarea>
                <label>Blog Author:</label>
                <select
                    value = {author}
                    onChange = {(e) => setAuthor(e.target.value)}
                >
                    <option value="lowe">lowe</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add blog</button>}
                {isPending && <button>Adding blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;