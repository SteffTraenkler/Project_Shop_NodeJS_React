export default function DefaultPage(props) {
    return (
        <div>
            <h1>{props.title || "New Page"}</h1>
            {props.children}
        </div>
    )
}